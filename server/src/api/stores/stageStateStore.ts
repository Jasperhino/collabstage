import { ISession, IStageState } from "../../types";

export class InMemoryStageStateStore {
  states = new Map<String, IStageState>();

  find(stageId: string) {
    return this.states.get(stageId);
  }

  save(stageId: string, stageState: IStageState) {
    this.states.set(stageId, stageState);
  }

  all() {
    return [...this.states.values()];
  }
}

const stageStateStore = new InMemoryStageStateStore();

export default stageStateStore;
