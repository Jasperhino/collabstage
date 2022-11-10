import { Socket } from 'socket.io-client';
import { IActorJoinedMessage, IJoinStageMessage, ISpellMessage, IStageOptions, IStageState } from '@server/types';

class StageService {
  public async joinStage(socket: Socket, stageId: string, actorName: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('join_stage', { stageId, actorName } as IJoinStageMessage);
      socket.on('stage_joined', () => rs(true));
      socket.on('stage_join_error', ({ error }) => rj(error));
    });
  }

  public async createStage(socket: Socket, options: IStageOptions): Promise<string> {
    return new Promise((rs, rj) => {
      socket.emit('create_stage', options);
      socket.on('stage_created', (stageId) => rs(stageId));
      socket.on('stage_create_error', ({ error }) => rj(error));
    });
  }

  public castSpell(socket: Socket, spell: ISpellMessage) {
    socket.emit('cast_spell', spell);
  }

  public async onStageUpdate(socket: Socket, listiner: (state: IStageState) => void) {
    socket.on('on_stage_update', (state) => listiner(state));
  }

  public async onActorJoined(socket: Socket, listiner: (message: IActorJoinedMessage) => void) {
    socket.on('on_actor_joined', (message) => listiner(message));
  }
}

export default new StageService();
