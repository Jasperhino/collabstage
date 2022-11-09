import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class PlayController {
  private getSocketStage(socket: Socket): string {
    const socketStages = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    const stage = socketStages && socketStages[0];

    return stage;
  }

  @OnMessage("start_play")
  public async startPlay(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const stage = this.getSocketStage(socket);
    console.log("Starting Play on ", message.stageId);
    socket.to(stage).emit("on_play_start", message);
  }

  @OnMessage("update_play")
  public async updatePlay(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const stage = this.getSocketStage(socket);
    socket.to(stage).emit("on_play_update", message);
  }

  @OnMessage("play_done")
  public async playDone(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const stage = this.getSocketStage(socket);
    socket.to(stage).emit("on_play_done", message);
  }
}
