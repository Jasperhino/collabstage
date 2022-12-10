import { ICastSpellMessage, IJoinStageMessage, IStageOptions } from '@server/types';
import { ISelectCharacterMessage, IStartPlayMessage, IStepDoneMessage } from '@server/types/messages';
//import { socket } from '../socketService';
import socketService from '../socketService';

export async function joinStage(stageId: string, actorName: string): Promise<boolean> {
  const socket = socketService.socket;

  return new Promise((rs, rj) => {
    if (!socket) return rj(false);
    socket.emit('join_stage', { stageId, actorName } as IJoinStageMessage);
    socket.on('stage_joined', (socketId: string) => {
      if (!socket) return rj(false);
      if (socket.id === socketId) rs(true);
    });
    socket.on('stage_joined_error', (error: string) => {
      rj(error);
    });
  });
}

export async function createStage(options: IStageOptions): Promise<string> {
  const socket = socketService.socket;

  return new Promise((rs, rj) => {
    if (!socket) return rj('Could not find a socket');

    socket.emit('create_stage', options);
    socket.on('stage_created', (stageId) => rs(stageId));
    socket.on('stage_create_error', (error) => rj(error));
  });
}

export function startPlay(message: IStartPlayMessage): Promise<boolean> {
  const socket = socketService.socket;

  return new Promise((rs, rj) => {
    if (!socket) return rj(false);
    socket.emit('start_play', message);
    socket.on('play_started', (stageId) => rs(stageId));
  });
}

export function castSpell(spell: ICastSpellMessage) {
  const socket = socketService.socket;

  if (!socket) return;
  socket.emit('cast_spell', spell);
}

export function stepDone(character: string) {
  const socket = socketService.socket;

  const message = { character } as IStepDoneMessage;
  if (!socket) return;
  socket.emit('step_done', message);
}

export function selectCharacter(character: string | null) {
  const socket = socketService.socket;

  const message = { character } as ISelectCharacterMessage;
  if (!socket) return;
  socket.emit('select_character', message);
}
