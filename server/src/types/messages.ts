export interface IStepDoneMessage {}

export interface IStartPlayMessage {
  force: boolean;
}

export interface ISelectCharacterMessage {
  character: string | null;
}
