export interface IStepDoneMessage {
  stageId: string;
  character: string;
}

export interface IStartPlayMessage {
  stageId: string;
}

export interface ISEndPlayMessage {
  stageId: string;
}


export interface ISelectCharacterMessage {
  character: string | null;
}
