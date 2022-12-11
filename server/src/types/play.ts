export interface ICharacter {
  name: string;
  avatar: string;
  description: string;
  age: number;
}

export interface IInteraction {
  type: "spell";
  spell: string;
  strength: number;
}

export interface IDecision {
  options: IDecisionOption[];
}

export interface IDecisionOption {
  text: string;
  branch: string;
}

export interface IStep {
  type: "interaction" | "decision" | "dialog";
  character: string;
  avatar: string;
  text: string;
  emotion: string;
  interaction?: IInteraction;
  decision?: IDecision;
  sound: string;
  emotions: string;
}

export interface IBranch {
  id: string;
  steps: IStep[];
}

export interface IPlay {
  scenario: string;
  background: string;
  description: string;
  characters: ICharacter[];
  shared_soundscape: string;
  script: IBranch[];
}


