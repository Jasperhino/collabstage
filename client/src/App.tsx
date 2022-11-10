import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import socketService from './services/socketService';
import JoinStage from './components/stage/JoinStage';
import CreateStage from './components/stage/CreateStage';
import Home from './components/home/Home';
import NoMatch from './components/NoMatch';
import FindStage from './components/stage/FindStage';
import SharedStage from './components/stage/SharedStage';
import Stage from './components/stage/Stage';
import { IStagesMessage } from '@server/types';

function App() {
  const host = 'http://localhost:9000';

  const connectSocket = async () => {
    const socket = await socketService.connect(host).catch((err) => {
      console.error('Error: ', err);
    });
    if (!socket) {
      console.error('Could not connect to socket');
      return;
    }
    console.log(`Connected to server ${host} via socket ${socket.id}`);
    socket.on('list_stages', (message: IStagesMessage) => {
      console.log('stages', message);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="stage/join" element={<FindStage />} />
      <Route path="stage/:stageId/join" element={<JoinStage />} />
      <Route path="stage/create" element={<CreateStage />} />
      <Route path="stage/:stageId/shared" element={<SharedStage />} />
      <Route path="stage/:stageId" element={<Stage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
