import { atom, useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import HeroLayout from '../layout/HeroLayout';
import NamePicker from './NamePicker';

const stageIdAtom = atom<string>('');
const playerNameAtom = atom<string>('');
const isJoiningAtom = atom<boolean>(false);
const isInStageAtom = atom<boolean>(false);

function JoinStage() {
  const [stageId, setStageId] = useAtom(stageIdAtom);
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [isJoining, setJoining] = useAtom(isJoiningAtom);
  const [isInStage, setInStage] = useAtom(isInStageAtom);
  const { id } = useParams<string>();

  useEffect(() => {
    if (isInStage) {
      setJoining(false);
    }
    console.log('paramStageId: ', id);

    if (id?.length == 4 && id?.match(/^[a-zA-Z]+$/)) {
      setStageId(id);
    }
  }, []);

  const joinStage = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!stageId || stageId.trim() === '' || !socket) {
      console.warn('No stageId or socket');
      return;
    }

    setJoining(true);

    const joined = await stageService.joinStage(socket, stageId, playerName).catch((err) => {
      alert(err);
    });

    if (joined) setInStage(true);

    setJoining(false);
  };

  return (
    <HeroLayout>
      <h1 className="text-5xl font-bold">Pick a name</h1>
      <NamePicker onNameChange={setPlayerName} />
      <button className="btn btn-primary" onClick={joinStage} disabled={isJoining || playerName.length < 3}>
        {isJoining ? 'Joining...' : 'Join'}
      </button>
    </HeroLayout>
  );
}

export default JoinStage;
