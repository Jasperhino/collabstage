import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";
import { IStageOptions } from "../../types";
import { makeid } from "../../utils/helpers";

@SocketController()
export class StageController {
  private getSocketStage(socket: Socket): string {
    const socketStages = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    const stage = socketStages && socketStages[0];

    return stage;
  }

  @OnMessage("join_stage")
  public async joinStage(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("New User joining stage: ", message);

    const connectedSockets = io.sockets.adapter.rooms.get(message.stageId);
    const socketStages = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    if (
      socketStages.length > 0 ||
      (connectedSockets && connectedSockets.size >= 3)
    ) {
      socket.emit("stage_join_error", {
        error:
          "This Stage is already full. Please choose another stage to play!",
      });
    } else {
      await socket.join(message.stageId);
      socket.emit("stage_joined");

      if (io.sockets.adapter.rooms.get(message.stageId).size === 3) {
        socket.emit("start_play", { start: true });
        socket.to(message.stageId).emit("start_play", { start: false });
      }
    }
  }

  @OnMessage("create_stage")
  public async createStage(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IStageOptions
  ) {
    const stageId = makeid(4, Array.from(io.sockets.adapter.rooms.keys()));
    await socket.join(stageId);
    socket.emit("stage_created", stageId);
    console.log("Created new stage: ", message);
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
}
