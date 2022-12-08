import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketService from './services/socketService';
import JoinStage from './components/stage/JoinStage';
import CreateStage from './components/stage/CreateStage';
import Home from './components/home/Home';
import FindStage from './components/stage/FindStage';
import SharedStage from './components/sharedstage/SharedStage';
import MobileStage from './components/mobilestage/MobileStage';
import Feather from './components/stage/Feather';
import Soundscape from './components/mobilestage/soundscape';

function App() {
  const connectSocket = async () => {
    const host = `${window.location.hostname}:9000`;
    console.log(`connecting to ${host}`);
    await socketService.connect(host).catch((err) => {
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
      <Route path="stage/:stageId/join" element={<JoinStage />} />
      <Route path="stage/create" element={<CreateStage />} />
      <Route path="stage/:stageId/shared" element={<SharedStage />} />
      
      <Route path="sound" element={<Soundscape />} />
      <Route path="feather" element={<Feather flying={false} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
