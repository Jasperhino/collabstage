import { ISession } from "../../types";

export class InMemorySessionStore {
  sessions = new Map<String, ISession>();

  createSession(sessionId: string) {
    this.sessions.set(sessionId, {
      sessionId,
      connected: true,
      stageId: null,
    });
  }

  joinStage(id: string, stageId: string) {
    if (this.sessions.get(id)) {
      this.sessions.get(id)!.stageId = stageId;
    }
  }

  findSession(id: string) {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: ISession) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }

  connected(id: string) {
    if (this.sessions.get(id)) {
      this.sessions.get(id)!.connected = true;
    }
  }

  disconnected(id: string) {
    if (this.sessions.get(id)) {
      this.sessions.get(id)!.connected = false;
    }
  }
}

const sessionStore = new InMemorySessionStore();

export default sessionStore;
