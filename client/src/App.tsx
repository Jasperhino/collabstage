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
import { atom } from 'jotai';
import Stage from './components/stage/Stage';

function App() {
  const playerName = atom<string>('');

  const connectSocket = async () => {
    const socket = await socketService.connect('http://localhost:9000').catch((err) => {
      console.error('Error: ', err);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="stage/join" element={<FindStage />} />
      <Route path="stage/join/:stageId" element={<JoinStage />} />
      <Route path="stage/create" element={<CreateStage />} />
      <Route path="stage/:stageId/shared" element={<SharedStage />} />
      <Route path="stage/:stageId" element={<Stage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
