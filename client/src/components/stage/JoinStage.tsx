import { atom, useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { joinStage } from '../../services/stageService';
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

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoining(true);

    if (!stageId || stageId.trim().length != 4) {
      console.error('Invalid stageId');
      return;
    }

    console.log('Joining stage: ', stageId);
    const success = await joinStage(stageId, actorName).catch((err) => {
      alert(err);
    });
    setJoining(false);
    navigate(`/stage/${stageId}/mobile`);
  };

  return (
    <HeroLayout>
      <h1 className="text-5xl font-bold">Pick a name</h1>
      <form onSubmit={handleForm}>
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
