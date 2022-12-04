import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";
import {
  IActorJoinedMessage,
  ICastSpellMessage,
  IJoinStageMessage,
  ISpellMessage,
  IStageOptions,
  IStageState,
  IStageStatus,
} from "../../types";
import { makeid } from "../../utils/helpers";

const stages = new Map<string, IStageState>();

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
    @MessageBody() message: IJoinStageMessage
  ) {
    console.log("New Actor joining stage: ", socket.id, message);

    if (!io.sockets.adapter.rooms.has(message.stageId)) {
      socket.emit("stage_join_error", { error: "Stage does not exist" });
      return;
    }

    const connectedSockets = io.sockets.adapter.rooms.get(message.stageId);
    const socketStages = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    console.log("Connected Sockets: ", connectedSockets);
    console.log("Socket Stages: ", socketStages);

    if (
      socketStages.length > 0 ||
      (connectedSockets && connectedSockets.size >= 100)
    ) {
      socket.emit(
        "stage_joined_error",
        socketStages.length > 0
          ? "You are already in a stage"
          : "This Stage is already full. Please choose another stage to play!"
      );
    } else {
      await socket.join(message.stageId);
      const state = stages.get(message.stageId);
      state.actors.push(message.actorName);
      socket.emit("stage_joined", socket.id);
      io.to(message.stageId).emit("actor_joined", {
        actorName: message.actorName,
      } as IActorJoinedMessage);
      io.to(message.stageId).emit("stage_update", stages.get(message.stageId));
      console.log("Sucessfully joined Stage: ", socket.id, message);
      if (io.sockets.adapter.rooms.get(message.stageId).size === 3) {
        io.to(message.stageId).emit("start_play");
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
    const stageState: IStageState = {
      stageId,
      actors: [],
      scenario: message.scenario,
      status: IStageStatus.NOT_STARTED,
      characters: {},
      playState: {
        currentBranchId: "start",
        currentStepIndex: 0,
      },
    };
    stages.set(stageId, stageState);
    await socket.join(stageId);
    socket.emit("stage_created", stageId);
    socket.emit("stage_update", stages.get(stageId));
    console.log("Created new stage: ", socket.id, stageId, message);
    console.log("Current Stages: ", io.sockets.adapter.rooms.keys());
  }

  @OnMessage("cast_spell")
  public async castSpell(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: ICastSpellMessage
  ) {
    const stage = this.getSocketStage(socket);
    console.log(`${socket.id} cast spell on ${stage} - ${message.spell}`);
    socket.to(stage).emit("cast_spell", {
      stageId: stage,
      spell: message.spell,
      socketId: socket.id,
    } as ISpellMessage);
  }

  @OnMessage("start_play")
  public async startPlay(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const stage = this.getSocketStage(socket);
    console.log("Starting Play on ", message.stageId);
    socket.to(stage).emit("play_start", message);
  }
}
