export interface IStageOptions {
  scenario: string;
}

export interface IStageState {
  stageId: string;
  scenario: string;
  players: string[];
  started: boolean;
}
