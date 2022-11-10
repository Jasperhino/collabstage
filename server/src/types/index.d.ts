export interface IStageOptions {
  scenario: string;
}

export interface IStageState {
  stageId: string;
  scenario: string;
  started: boolean;
}

export interface IJoinStageMessage {
  stageId: string;
  actorName: string;
}

export interface IStagesMessage {
  stages: string[];
}

export interface IActorJoinedMessage {
  actorName: string;
}

export interface ISpellMessage {
  spell: string;
}
