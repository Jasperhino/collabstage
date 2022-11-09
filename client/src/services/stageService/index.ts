import { Socket } from 'socket.io-client';
import { IStageOptions, IStageState } from '@server/types';

class StageService {
  public async joinStage(socket: Socket, stageId: string, playerName: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('join_stage', { stageId, playerName });
      socket.on('stage_joined', () => rs(true));
      socket.on('stage_join_error', ({ error }) => rj(error));
    });
  }

  public async createStage(socket: Socket, options: IStageOptions): Promise<string> {
    return new Promise((rs, rj) => {
      socket.emit('create_stage', { options });
      socket.on('stage_created', (stageId) => rs(stageId));
      socket.on('stage_create_error', ({ error }) => rj(error));
    });
  }

  public async updateStage(socket: Socket, playState: IStageState) {
    socket.emit('update_stage', { playState: playState });
  }

  public async onStageUpdate(socket: Socket, listiner: (state: IStageState) => void) {
    socket.on('on_game_update', ({ state }) => listiner(state));
  }
}

export default new StageService();
