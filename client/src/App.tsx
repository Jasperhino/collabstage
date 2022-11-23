import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketService from './services/socketService';
import JoinStage from './components/stage/JoinStage';
import CreateStage from './components/stage/CreateStage';
import Home from './components/home/Home';
import NoMatch from './components/NoMatch';
import FindStage from './components/stage/FindStage';
import SharedStage from './components/stage/SharedStage';
import Stage from './components/stage/Stage';
import { IStagesMessage } from '@server/types';
import Feather from './components/stage/Feather';
import DialogBox from './components/dialog/DialogBox';


function App() {
  const connectSocket = async () => {
    const host = `${window.location.hostname}:9000`;
    console.log(`connecting to ${host}`);
    const socket = await socketService.connect(host).catch((err) => {
      console.error('Error: ', err);
    });
    if (!socket) {
      console.error('Could not connect to socket');
      return;
    }
    console.log(`Connected to server  ${host} via socket ${socket.id}`);
    socket.on('list_stages', (message: IStagesMessage) => {
      console.log('stages', message);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const messages = [
    "This is a very cool RPG dialog message.",
    "If you would like to see more awesome stuff, check out the other writeups at codeworkshop.dev!",
    "Remember to wash your hands!"
  ];
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="stage/join" element={<FindStage />} />
      <Route path="stage/:stageId/join" element={<JoinStage />} />
      <Route path="stage/create" element={<CreateStage />} />
      <Route path="stage/:stageId/shared" element={<SharedStage />} />
      <Route path="stage/:stageId" element={<Stage />} />
      <Route path="stage/:stageId/dialog" element={<DialogBox />} />
      <Route path="feather" element={<Feather flying={false} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
