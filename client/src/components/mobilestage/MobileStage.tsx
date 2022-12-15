import React, { useEffect, useState } from 'react';
import { IStageState, IStageStatus } from '@server/types';
import socketService from 'src/services/socketService';
import { IPlay } from '@server/types/play';
import CharacterSelection from './MobileCharacterSelection';
import Briefing from './MobileBriefing';
import MobilePlay from './MobilePlay';
import MobileHintModal from './MobileHintModal';
import Navbar from '../layout/Navbar';

interface IMobileStageProps {
  play: IPlay | null;
  state: IStageState | null;
  sessionId: string;
}

export default function MobileStage({ play, state, sessionId }: IMobileStageProps) {
  const [character, setCharacter] = useState<string | null>(null);

  useEffect(() => {
    const socket = socketService.socket;
    if (!socket) return;
    socket.on('select_character_error', (error) => {
      alert(error);
    });
  }, []);

  useEffect(() => {
    const socket = socketService.socket;
    if (!state || !socket) return;
    const actor = state.actors.find((a) => a.sessionId == sessionId);
    if (actor) setCharacter(actor.character);
  }, [state]);

  return (
    <>
      <Navbar fixed={false} />

      <MobileHintModal />
      {play && state && state.status == IStageStatus.NOT_STARTED && !character && (
        <CharacterSelection state={state} play={play} />
      )}
      {play && state && state.status == IStageStatus.NOT_STARTED && character && (
        <Briefing play={play} character={character} />
      )}
      {play && state && state.status == IStageStatus.IN_PROGRESS && character && (
        <MobilePlay playState={state.playState} play={play} character={character} />
      )}
    </>
  );
}
