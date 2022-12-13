import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketService from './services/socketService';
import JoinStage from './components/stage/JoinStage';
import CreateStage from './components/stage/CreateStage';
import Home from './components/home/Home';
import FindStage from './components/stage/FindStage';
import SharedStage from './components/sharedstage/SharedStage';
import MobileStage from './components/mobilestage/MobileStage';
import Torch from './components/mobilestage/Torch';
import { IStageState } from '@server/types';
import { IPlay } from '@server/types/play';

function App() {
  const [state, setState] = useState<IStageState | null>(null);
  const [play, setPlay] = useState<IPlay | null>(null);

  const connectSocket = async () => {
    const host = `${window.location.hostname}:9000`;
    console.log(`connecting to ${host}`);
    await socketService.connect(host).catch((err) => {
      console.error('Error: ', err);
    });
  };

  useEffect(() => {
    connectSocket();
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      return;
    }
    socket.on('stage_update', (state) => {
      console.log('Stage Updated: ', state);
      setState(state);
    });

    socket.on('play_update', (play) => {
      console.log('Play Updated: ', play);
      setPlay(play);
    });

    return () => {
      socket.off('stage_update');
      socket.off('play_update');
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="stage/join" element={<FindStage />} />
      <Route path="stage/create" element={<CreateStage />} />
      <Route path="stage/:stageId/join" element={<JoinStage />} />
      <Route path="stage/:stageId/shared" element={<SharedStage play={play} state={state} />} />
      <Route path="stage/:stageId/mobile" element={<MobileStage play={play} state={state} />} />
      <Route path="flash" element={<Torch torchOn={true} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
