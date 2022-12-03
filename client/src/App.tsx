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
import CharacterSelection from './components/stage/CharacterSelection';
import HarryExplanation from './components/stage/HarryExplanation';
import HermioneExplanation from './components/stage/HermioneExplanation';
import RonExplanation from './components/stage/RonExplanation';
import ActorList from './components/stage/ActorList';

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
      <Route path="character" element={<CharacterSelection />} />
      <Route path="character/Harry" element={<HarryExplanation />} />
      <Route path="character/Hermione" element={<HermioneExplanation />} />
      <Route path="actor" element={<ActorList actors={["Diogo"]} />} />
      <Route path="character/Ron" element={<RonExplanation />} />
      <Route path="stage/:stageId/shared" element={<SharedStage />} />
      <Route path="stage/:stageId" element={<Stage />} />
      <Route path="feather" element={<Feather />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
