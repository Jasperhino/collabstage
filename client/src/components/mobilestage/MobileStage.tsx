import { IStageState, IStageStatus } from '@server/types';
import React, { useEffect, useState } from 'react';
import { castSpell } from '../../services/stageService';
import socketService from 'src/services/socketService';
import { IPlay } from '@server/types/play';
import { IActorJoinedMessage } from '@server/types';
import CharacterSelection from '../stage/CharacterSelection';
import { Socket } from 'socket.io-client';
import Briefing from '../stage/Briefing';

/*interface IMobileStageProps {
  state: IStageState
}*/
//Todo: refactor to share one source of game state with SharedStage

export default function MobileStage() {
  const [state, setState] = useState<IStageState | null>(null);
  const [play, setPlay] = useState<IPlay | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [character, setCharacter] = useState<string | null>(null);

  useEffect(() => {
    const socket = socketService.socket;
    setSocket(socket);
    if (!socket) {
      console.error('No socket');
      //navigate('/');
      return;
    }

    socket.on('actor_joined', (message: IActorJoinedMessage) => {
      console.log(`${message.actorName} joined the Stage`);
    });

    socket.on('stage_update', (state: IStageState) => {
      console.log('Stage Updated: ', state);
      setState(state);
      if (socket) {
        const actor = state.actors.find((a) => a.socketId == socket.id);
        if (actor) {
          setCharacter(actor.character);
        }
      }
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
      {play && state && state.status == IStageStatus.NOT_STARTED && <CharacterSelection state={state} play={play} />}
      {socket && play && state && state.status == IStageStatus.NOT_STARTED && character && (
        <Briefing play={play} characterName={character} />
      )}
    </>
  );
}
