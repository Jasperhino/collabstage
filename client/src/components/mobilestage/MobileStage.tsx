import { IStageState, IStageStatus } from '@server/types';
import React, { useEffect, useState } from 'react';
import { castSpell } from '../../services/stageService';
import socketService from 'src/services/socketService';
import { IPlay } from '@server/types/play';
import CharacterSelection from './MobileCharacterSelection';
import Briefing from './MobileBriefing';
import MobilePlay from './MobilePlay';

interface IMobileStageProps {
  play: IPlay | null;
  state: IStageState | null;
}

export default function MobileStage({ play, state }: IMobileStageProps) {
  const [character, setCharacter] = useState<string | null>(null);

  useEffect(() => {
    const socket = socketService.socket;
    if (!state || !socket) return;
    const actor = state.actors.find((a) => a.socketId == socket.id);
    if (actor) setCharacter(actor.character);
  }, [state]);

  function handleButton(): void {
    console.log('Sending button press');
    castSpell({ spell: 'stupor' });
  }

  return (
    <>
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
