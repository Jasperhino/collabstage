import { IStageState, IStageStatus } from '@server/types';
import React, { useEffect, useState } from 'react';
import { castSpell } from '../../services/stageService';
import HeroLayout from '../layout/HeroLayout';
import socketService from 'src/services/socketService';
import { IPlay } from '@server/types/play'
import { IActorJoinedMessage } from '@server/types'
import CharacterSelection from '../stage/CharacterSelection';

/*interface IMobileStageProps {
  state: IStageState
}*/
  //Todo: refactor to share one source of game state with SharedStage

export default function MobileStage(){ //{state}: IStageState) {

  const [state, setState] = useState<IStageState | null>(null);
  const [play, setPlay] = useState<IPlay | null>(null);

  useEffect(() => {
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      //navigate('/');
      return;
    }

    socket.on('actor_joined', (message: IActorJoinedMessage) => {
      console.log(`${message.actorName} joined the Stage`);
    });

    socket.on('stage_update', (state) => {
      console.log('Stage Updated: ', state);
      setState(state);
    });

    socket.on('play_update', (state) => {
      console.log('Play Updated: ', state);
      setPlay(state);
    });
  }, []);

  function handleButton(): void {
    console.log('Sending button press');
    castSpell({ spell: 'stupor' });
  }

  return (
    <>
      {state && state.status == IStageStatus.NOT_STARTED && <CharacterSelection state={state} />}
      </>
  );
}
