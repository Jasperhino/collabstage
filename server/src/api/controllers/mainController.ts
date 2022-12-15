import {
  ConnectedSocket,
  OnConnect,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";
import playStore from "../stores/playStore";
import sessionStore from "../stores/sessionStore";
import stageStateStore from "../stores/stageStateStore";

@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    const { sessionId, stageId } = socket.data.session;
    socket.join(sessionId);
    if (stageId) socket.join(stageId);
    sessionStore.connected(sessionId);
    const session = sessionStore.findSession(sessionId);
    socket.emit("session", session);
    socket.emit("stage_update", stageStateStore.find(session.stageId));
    socket.emit("play_update", playStore.find(session.stageId));

    console.log(`New Socket ${socket.id} connected to session ${sessionId}`);

    socket.on("disconnect", async () => {
      const { sessionId } = socket.data.session;
      const matchingSockets = await io.in(sessionId).fetchSockets();
      const isDisconnected = matchingSockets.length === 0;
      if (isDisconnected) {
        // notify other users
        console.log(`Session ${sessionId} disconnected`);
        socket.broadcast.emit("user disconnected", sessionId);
        // update the connection status of the session
        sessionStore.disconnected(sessionId);
      }
    });
  }
}
