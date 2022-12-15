import { IPlay } from "./play";

export interface IStageOptions {
  scenario: string;
}

export interface IStageState {
  stageId: string;
  host: string;
  actors: IActor[];
  scenario: string;
  status: IStageStatus;
  playState: IPlayState;
}

export interface IActor {
  sessionId: string;
  name: string;
  character: string | null;
}

export enum IStageStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export interface IPlayState {
  currentBranchId: string;
  currentStepIndex: number;
}

export interface IJoinStageMessage {
  stageId: string;
  actorName: string;
}

export interface IStageJoinedMessage {
  socketId: string;
}

export interface IStagesMessage {
  stages: string[];
}

export interface IActorJoinedMessage {
  actorName: string;
}

export interface ISpellMessage {
  spell: string;
  strength: number;
}

export interface ISession {
  sessionId: string;
  connected: boolean;
  stageId: string | null;
}
