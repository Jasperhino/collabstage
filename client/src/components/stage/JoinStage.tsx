import React, { useContext, useState } from 'react';
import gameContext from '../../gameContext';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';

interface IJoinStageProps {}

function JoinStage(props: IJoinStageProps) {
  const [stageName, setStageName] = useState('');
  const [isJoining, setJoining] = useState(false);

  const { setInRoom: setInStage, isInStage } = useContext(gameContext);

  const handleStageNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setStageName(value);
  };

  const stageRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!stageName || stageName.trim() === '' || !socket) return;

    setJoining(true);

    const joined = await stageService.joinStage(socket, stageName).catch((err) => {
      alert(err);
    });

    if (joined) setInStage(true);

    setJoining(false);
  };

  return (
    <div>
      <h4>scan qr code to Join the Game</h4>
      <NamePicker />
      <button className="btn" onClick={stageRoom} disabled={isJoining}>
        {isJoining ? 'Joining...' : 'Joing'}
      </button>
    </div>
  );
}

export default JoinStage;
