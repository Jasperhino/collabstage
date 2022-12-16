import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";
import { nanoid } from "nanoid";
import sessionStore from "./api/stores/sessionStore";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
      // find existing session
      const session = sessionStore.findSession(sessionId);
      if (session) {
        console.log("Found existing session: ", sessionId);
        socket.data.session = session;
        return next();
      }
    }
    // create new session
    const newSessionId = nanoid();
    //console.log("Create new session: ", newSessionId);
    sessionStore.createSession(newSessionId);
    //console.log("Session store: ", sessionStore.sessions);
    socket.data.session = sessionStore.findSession(newSessionId);

    next();
  });

  useSocketServer(io, { controllers: [__dirname + "/api/controllers/*.ts"] });

  return io;
};
