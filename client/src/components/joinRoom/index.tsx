import React, { useContext, useState } from 'react';
import gameContext from '../../gameContext';
import gameService from '../../services/gameService';
import socketService from '../../services/socketService';

interface IJoinRoomProps {}

export function JoinRoom(props: IJoinRoomProps) {
  const [roomName, setRoomName] = useState('');
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === '' || !socket) return;

    setJoining(true);

    const joined = await gameService.joinGameRoom(socket, roomName).catch((err) => {
      alert(err);
    });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <div>
      <h4>scan qr code to Join the Game</h4>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
      </div>
      <button className="btn" onClick={joinRoom} disabled={isJoining}>
        {isJoining ? 'Joining...' : 'Joing'}
      </button>
    </div>
  );
}
