import React, { useEffect, useState } from 'react';
import './App.css';
import socketService from './services/socketService';
import JoinStage from './components/stage/JoinStage';
import CreateStage from './components/stage/CreateStage';
import GameContext, { IGameContextProps } from './gameContext';
import { Play } from './components/play';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NoMatch from './components/NoMatch';

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('x');
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService.connect('http://localhost:9000').catch((err) => {
      console.error('Error: ', err);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="stage/join" element={<JoinStage />} />
        <Route path="stage/create" element={<CreateStage />} />
        <Route path="play" element={<Play />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </GameContext.Provider>
  );
}

export default App;
