import { atom, useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
  let joined = false;

  const joinStage = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!stageId || stageId.trim() === '' || !socket) {
      console.warn('No stageId or socket');
      return;
    }

    setJoining(true);

    console.log('Joining stage: ', stageId);
    const success = await stageService.joinStage(socket, stageId, actorName).catch((err) => {
      alert(err);
    });
    if (success) {
      joined = true;
      console.log(`${socket.id} joined ${stageId}`);
    }
    navigate(`/stage/${stageId}`);
    setJoining(false);
  };

  return (
    <HeroLayout>
      <h1 className="text-5xl font-bold">Pick a name</h1>
      <form onSubmit={joinStage}>
        <NamePicker onNameChange={setActorName} />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isJoining || actorName.length < 3 || actorName.length > 12}
        >
          {isJoining ? 'Joining...' : 'Join'}
        </button>
      </form>
      {joined && <Navigate to={`/stage/${stageId}`} />}
    </HeroLayout>
  );
}

export default JoinStage;
