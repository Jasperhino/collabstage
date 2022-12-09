export interface IStageOptions {
  scenario: string;
}

export interface IStageState {
  stageId: string;
  actors: IActor[];
  scenario: string;
  status: IStageStatus;
  playState: IPlayState;
}

export interface IActor {
  socketId: string;
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
  socketId: string;
  stageId: string;
  spell: string;
}

export interface ICastSpellMessage {
  spell: string;
}
