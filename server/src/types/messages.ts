export interface IStepDoneMessage {}

export interface IStartPlayMessage {
  force: boolean;
}

export interface ISEndPlayMessage {
  stageId: string;
}


export interface ISelectCharacterMessage {
  character: string | null;
}
