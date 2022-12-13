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
import {
  ISelectCharacterMessage,
  IStartPlayMessage,
} from "../../types/messages";
import { IPlay } from "../../types/play";
import { loadPlay, makeid } from "../../utils/helpers";

const stages = new Map<string, IStageState>();
const actorNames = new Map<string, string>();
const actorCharacters = new Map<string, string>();
const plays = new Map<string, IPlay>();

@SocketController()
export class StageController {
  private getSocketStageId(socket: Socket): string {
    const socketStages = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    const stageId = socketStages && socketStages[0];

    return stageId;
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
      playState: {
        currentBranchId: "start",
        currentStepIndex: 0,
      },
    };
    stages.set(stageId, stageState);
    plays.set(stageId, await loadPlay(message.scenario));
    await socket.join(stageId);
    socket.emit("stage_created", stageId);
    console.log("Created new stage: ", socket.id, stageId, message);

    socket.emit("stage_update", stages.get(stageId));
    io.to(stageId).emit("stage_update", stages.get(stageId));

    socket.emit("play_update", plays.get(stageId));

    console.log(
      "Pushing state update: ",
      socket.id,
      stageId,
      stages.get(stageId)
    );

    console.log("Current Stages: ", io.sockets.adapter.rooms.keys());
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
      console.log("Error joining stage: ", socket.id, message);
      socket.emit(
        "stage_joined_error",
        socketStages.length > 0
          ? "You are already in a stage"
          : "This Stage is already full. Please choose another stage to play!"
      );
    } else {
      await socket.join(message.stageId);
      const state = stages.get(message.stageId);
      actorNames.set(socket.id, message.actorName);
      state.actors.push({
        name: message.actorName,
        socketId: socket.id,
        character: null,
      });
      socket.emit("stage_joined", socket.id);
      io.to(message.stageId).emit("actor_joined", {
        actorName: message.actorName,
      } as IActorJoinedMessage);
      io.to(message.stageId).emit("stage_update", stages.get(message.stageId));
      console.log("Sucessfully joined Stage: ", socket.id, message);
      socket.emit("play_update", plays.get(message.stageId));

      if (io.sockets.adapter.rooms.get(message.stageId).size === 3) {
        io.to(message.stageId).emit("start_play");
      }
    }
  }

  @OnMessage("cast_spell")
  public async castSpell(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: ICastSpellMessage
  ) {
    const stageId = this.getSocketStageId(socket);
    console.log(`${socket.id} cast spell on ${stageId} - ${message.spell}`);
    socket.to(stageId).emit("cast_spell", {
      stageId,
      spell: message.spell,
      socketId: socket.id,
    } as ISpellMessage);
  }

  @OnMessage("start_play")
  public async startPlay(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IStartPlayMessage
  ) {
    const stageId = this.getSocketStageId(socket);
    const state = stages.get(stageId);
    state.status = IStageStatus.IN_PROGRESS;
    stages.set(stageId, state);

    console.log("Starting Play on", message.stageId);
    socket.emit("stage_update", stages.get(stageId));
    io.to(stageId).emit("stage_update", stages.get(stageId));
  }

  @OnMessage("step_done")
  public async stepDone(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IStartPlayMessage
  ) {
    const stageId = this.getSocketStageId(socket);
    const state = stages.get(stageId);
    const play = plays.get(stageId);
    const branch = play.script.find(
      (e) => e.id == state.playState.currentBranchId
    );
    const step = branch.steps[state.playState.currentStepIndex];

    if (step.type === "dialog" || step.type === "interaction") {
      if (branch.steps.length < state.playState.currentStepIndex + 1) {
        state.status = IStageStatus.FINISHED;
      } else {
        state.playState.currentStepIndex++;
      }
    }

    io.to(stageId).emit("stage_update", stages.get(stageId));
  }

  @OnMessage("select_character")
  public async selectCharacter(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: ISelectCharacterMessage
  ) {
    const stageId = this.getSocketStageId(socket);
    const state = stages.get(stageId);
    const play = plays.get(stageId);

    console.log("Selecting Character", message.character, "on", stageId);

    if (state.status !== IStageStatus.NOT_STARTED) {
      console.log("Game not started");
      socket.emit("select_character_error", "Game already started");
      return;
    }
    if (
      message.character != null &&
      !play.characters.map((c) => c.name).includes(message.character)
    ) {
      console.log("Character does not exist");
      socket.emit("select_character_error", "Character does not exist");
      return;
    }
    const takenCharacters = state.actors.map((a) => a.character);
    if (takenCharacters.includes(message.character)) {
      console.log("Character already taken");
      socket.emit("select_character_error", "Character already taken");
      return;
    }

    actorCharacters.set(socket.id, message.character);

    const actor = state.actors.find((a) => a.socketId === socket.id);
    if (actor) {
      actor.character = message.character;
    }
    console.log("Actor", actor);
    state.actors = state.actors.map((a) =>
      a.socketId !== socket.id ? a : actor
    );

    stages.set(stageId, state);
    io.to(stageId).emit("stage_update", stages.get(stageId));
  }
}
