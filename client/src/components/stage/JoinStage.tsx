import { atom, useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import HeroLayout from '../layout/HeroLayout';
import NamePicker from './NamePicker';

const actorNameAtom = atom<string>('');
const isJoiningAtom = atom<boolean>(false);

function JoinStage() {
  const [actorName, setActorName] = useAtom(actorNameAtom);
  const [isJoining, setJoining] = useAtom(isJoiningAtom);
  const { stageId } = useParams<string>();
  const navigate = useNavigate();

  const joinStage = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!stageId || stageId.trim() === '' || !socket) {
      console.warn('No stageId or socket');
      return;
    }

    setJoining(true);

    const joined = await stageService.joinStage(socket, stageId, actorName).catch((err) => {
      alert(err);
    });
    if (joined) {
      console.log(`${socket.id} joined ${stageId}`);
    }
    setJoining(false);
    navigate(`/stage/${stageId}`);
  };

  return (
    <HeroLayout>
      <h1 className="text-5xl font-bold">Pick a name</h1>
      <NamePicker onNameChange={setActorName} />
      <button className="btn btn-primary" onClick={joinStage} disabled={isJoining || actorName.length < 3}>
        {isJoining ? 'Joining...' : 'Join'}
      </button>
    </HeroLayout>
  );
}

export default JoinStage;
