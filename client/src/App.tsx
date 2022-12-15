import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import socketService from './services/socketService';
import JoinStage from './components/stage/JoinStage';
import CreateStage from './components/stage/CreateStage';
import Home from './components/home/Home';
import FindStage from './components/stage/FindStage';
import { ISession, IStageState } from '@server/types';
import { IPlay } from '@server/types/play';
import Stage from './components/stage/Stage';
import Navbar from './components/layout/Navbar';

function App() {
  const [session, setSession] = useState<ISession | null>(null);
  const [state, setState] = useState<IStageState | null>(null);
  const [play, setPlay] = useState<IPlay | null>(null);
  const navigate = useNavigate();
  const connectSocket = async () => {
    const host = `${window.location.hostname}:9000`;
    const sessionId = sessionStorage.getItem('sessionId');
    console.log(`connecting to ${host}`);
    await socketService.connect(host, sessionId).catch((err) => {
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
    socket.on('session', (session: ISession) => {
      console.log('Session: ', session);
      socket.auth = { sessionId: session.sessionId };
      sessionStorage.setItem('sessionId', session.sessionId);
      setSession(session);
    });

    socket.on('stage_update', (state) => {
      console.log('Stage: ', state);
      setState(state);
    });

    socket.on('play_update', (play) => {
      console.log('Play: ', play);
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
      <Route path="stage/:stageId" element={<Stage play={play} state={state} session={session} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
