import { IPlay } from "../../types/play";

export class InMemoryPlayStore {
  plays = new Map<String, IPlay>();

  find(id: string) {
    return this.plays.get(id);
  }

  save(id: string, play: IPlay) {
    this.plays.set(id, play);
  }
}

const playStore = new InMemoryPlayStore();

export default playStore;
