import { Socket } from 'socket.io-client';
import { ICastSpellMessage, IJoinStageMessage, ISpellMessage, IStageOptions } from '@server/types';

class StageService {
  public async joinStage(socket: Socket, stageId: string, actorName: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('join_stage', { stageId, actorName } as IJoinStageMessage);
      socket.on('stage_joined', (socketId: string) => {
        console.log('checking stage joined', socketId, socket.id);
        if (socketId === socket.id) rs(true);
      });
      socket.on('stage_joined_error', (error: string) => {
        rj(error);
      });
    });
  }

  public async createStage(socket: Socket, options: IStageOptions): Promise<string> {
    return new Promise((rs, rj) => {
      socket.emit('create_stage', options);
      socket.on('stage_created', (stageId) => rs(stageId));
      socket.on('stage_create_error', (error) => rj(error));
    });
  }

  public castSpell(socket: Socket, spell: ICastSpellMessage) {
    socket.emit('cast_spell', spell);
  }

  public stepDone(socket: Socket, message: IStepDoneMessage) {
    socket.emit('step_done', message);
  }
}

export default new StageService();
