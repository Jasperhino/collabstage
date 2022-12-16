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
  ISpellMessage,
  IJoinStageMessage,
  IStageOptions,
  IStageState,
  IStageStatus,
} from "../../types";
import {
  ISelectCharacterMessage,
  IStartPlayMessage,
  IStepDoneMessage,
} from "../../types/messages";
import { loadPlay, makeid } from "../../utils/helpers";
import playStore from "../stores/playStore";
import sessionStore from "../stores/sessionStore";
import stageStateStore from "../stores/stageStateStore";

@SocketController()
export class StageController {
  @OnMessage("create_stage")
  public async createStage(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IStageOptions
  ) {
    const { sessionId } = socket.data.session;

    const stageId = makeid(4, Array.from(io.sockets.adapter.rooms.keys()));
    const stageState: IStageState = {
      stageId,
      host: sessionId,
      actors: [],
      scenario: message.scenario,
      status: IStageStatus.NOT_STARTED,
      playState: {
        currentBranchId: "start",
        currentStepIndex: 0,
      },
    };
    sessionStore.joinStage(sessionId, stageId);
    stageStateStore.save(stageId, stageState);
    playStore.save(stageId, await loadPlay(message.scenario));
    console.log("Created new stage: ", sessionId, stageId, message);

    await socket.join(stageId);
    io.to(sessionId).emit("stage_created", stageId);
    io.to(sessionId).emit("session", sessionStore.findSession(sessionId));

    io.to(sessionId).emit("stage_update", stageStateStore.find(stageId));

    io.to(sessionId).emit("play_update", await loadPlay(message.scenario));

    console.log("Current Stages: ", io.sockets.adapter.rooms.keys());
  }

  @OnMessage("join_stage")
  public async joinStage(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IJoinStageMessage
  ) {
    const { sessionId } = socket.data.session;

    console.log("New Actor joining stage: ", sessionId, message);

    const connectedSockets = io.sockets.adapter.rooms.get(message.stageId);

    console.log("Connected Sockets: ", connectedSockets);

    if (connectedSockets && connectedSockets.size >= 4) {
      //+1 for shared stage
      console.log("Error joining stage: ", sessionId, message);
      socket.emit(
        "stage_joined_error",
        +"This Stage is already full. Please choose another stage to play!"
      );
      return;
    }

    await socket.join(message.stageId);
    sessionStore.joinStage(sessionId, message.stageId);
    const state = stageStateStore.find(message.stageId);
    state.actors.push({
      name: message.actorName,
      sessionId,
      character: null,
    });
    socket.emit("stage_joined", socket.id);
    io.to(message.stageId).emit("actor_joined", {
      actorName: message.actorName,
    } as IActorJoinedMessage);
    io.to(message.stageId).emit(
      "stage_update",
      stageStateStore.find(message.stageId)
    );
    console.log("Sucessfully joined Stage: ", sessionId, message);
    socket.emit("play_update", playStore.find(message.stageId));
  }

  @OnMessage("cast_spell")
  public async castSpell(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: ISpellMessage
  ) {
    const { stageId, sessionId } = socket.data.session;

    console.log(
      `${sessionId} cast spell on ${stageId} - ${message.spell}, strength ${message.strength}`
    );
    socket.to(stageId).emit("cast_spell", message);
  }

  @OnMessage("start_play")
  public async startPlay(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IStartPlayMessage
  ) {
    const { sessionId, stageId } = socket.data.session;
    const state = stageStateStore.find(stageId);

    if (state.host !== sessionId) {
      console.log("Only the host is allowed to start the play");
      socket.emit(
        "start_play_error",
        "Only the host is allowed to start the play"
      );
      return;
    }

    if (state.status !== IStageStatus.NOT_STARTED) {
      console.log("Game already running");
      socket.emit("start_play_error", "Game already running");
      return;
    }
    if (!message.force && state.actors.length < 3) {
      socket.emit("stage_join_error", {
        error: "You need at least 3 actors to start playing",
      });
      return;
    }
    state.status = IStageStatus.IN_PROGRESS;
    stageStateStore.save(stageId, state);

    console.log("Starting Play on", stageId);
    socket.emit("stage_update", stageStateStore.find(stageId));
    io.to(stageId).emit("stage_update", stageStateStore.find(stageId));
  }

  @OnMessage("step_done")
  public async stepDone(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket
    //@MessageBody() message: IStepDoneMessage
  ) {
    const { sessionId, stageId } = socket.data.session;
    const state = stageStateStore.find(stageId);
    const play = playStore.find(stageId);
    const branch = play.script.find(
      (e) => e.id == state.playState.currentBranchId
    );
    const step = branch.steps[state.playState.currentStepIndex];

    if (
      sessionId !== state.host &&
      !state.actors.map((a) => a.sessionId).includes(sessionId)
    ) {
      console.log("Only the host or an actor is allowed to step done");
      socket.emit(
        "step_done_error",
        "Only the host or an actor is allowed to step done"
      );
      return;
    }
    if (step.type === "dialog" || step.type === "interaction") {
      if (branch.steps.length < state.playState.currentStepIndex + 1) {
        state.status = IStageStatus.FINISHED;
      } else {
        state.playState.currentStepIndex++;
      }
    }

    stageStateStore.save(stageId, state);
    io.to(stageId).emit("stage_update", stageStateStore.find(stageId));
  }

  @OnMessage("step_back")
  public async stepBack(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: IStartPlayMessage
  ) {
    const { sessionId, stageId } = socket.data.session;
    const state = stageStateStore.find(stageId);

    if (sessionId !== state.host) {
      console.log("Only the host allowed to step back");
      socket.emit("step_done_error", "Only the host is allowed to step back");
      return;
    }
    if (state.playState.currentStepIndex > 0) {
      state.playState.currentStepIndex--;
    }

    stageStateStore.save(stageId, state);
    io.to(stageId).emit("stage_update", stageStateStore.find(stageId));
  }

  @OnMessage("select_character")
  public async selectCharacter(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: ISelectCharacterMessage
  ) {
    const { sessionId, stageId } = socket.data.session;
    const state = stageStateStore.find(stageId);
    const play = playStore.find(stageId);

    console.log(
      `Session ${sessionId} selecting ${message.character} on ${stageId}`
    );

    if (state && state.status !== IStageStatus.NOT_STARTED) {
      console.log("Game already started");
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
    console.log("Taken Characters", takenCharacters);
    if (
      message.character != null &&
      takenCharacters.includes(message.character)
    ) {
      console.log("Character already taken");
      socket.emit("select_character_error", "Character already taken");
      return;
    }

    const actor = state.actors.find((a) => a.sessionId === sessionId);
    if (actor) {
      console.log("Actor found", actor);
      actor.character = message.character;
    }
    console.log("Actor", actor);
    state.actors = state.actors.map((a) =>
      a.sessionId !== sessionId ? a : actor
    );

    stageStateStore.save(stageId, state);
    io.to(stageId).emit("stage_update", stageStateStore.find(stageId));
  }
}
