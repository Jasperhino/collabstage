import { Socket } from 'socket.io-client';
import { IPlayMatrix, IStartGame } from '../../components/play';

class StageService {
  public async joinStage(socket: Socket, stageId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('join_stage', { stageId: stageId });
      socket.on('stage_joined', () => rs(true));
      socket.on('stage_join_error', ({ error }) => rj(error));
    });
  }

  public async updateStage(socket: Socket, gameMatrix: IPlayMatrix) {
    socket.emit('update_stage', { matrix: gameMatrix });
  }

  public async onStageUpdate(socket: Socket, listiner: (matrix: IPlayMatrix) => void) {
    socket.on('on_game_update', ({ matrix }) => listiner(matrix));
  }

  public async onStartGame(socket: Socket, listiner: (options: IStartGame) => void) {
    socket.on('start_game', listiner);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit('game_win', { message });
  }

  public async onGameWin(socket: Socket, listiner: (message: string) => void) {
    socket.on('on_game_win', ({ message }) => listiner(message));
  }
}

export default new StageService();
