export interface IStageOptions {
  scenario: string;
}

export interface IStageState {
  stageId: string;
  actors: string[];
  scenario: string;
  started: boolean;
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
