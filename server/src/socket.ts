import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";

import { Request, Response } from "express";
import session, { Session } from "express-session";
import { IncomingMessage } from "http";

declare module "http" {
  interface IncomingMessage {
    cookieHolder?: string;
    session: Session & {
      count: number;
    };
  }
}

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: false,
});

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
    allowRequest: (req, callback) => {
      // with HTTP long-polling, we have access to the HTTP response here, but this is not
      // the case with WebSocket, so we provide a dummy response object
      const fakeRes = {
        getHeader() {
          return [];
        },
        setHeader(key: string, values: string[]) {
          req.cookieHolder = values[0];
        },
        writeHead() {},
      };
      sessionMiddleware(req as Request, fakeRes as unknown as Response, () => {
        if (req.session) {
          // trigger the setHeader() above
          fakeRes.writeHead();
          // manually save the session (normally triggered by res.end())
          req.session.save();
        }
        callback(null, true);
      });
    },
  });

  io.engine.on(
    "initial_headers",
    (headers: { [key: string]: string }, req: IncomingMessage) => {
      if (req.cookieHolder) {
        headers["set-cookie"] = req.cookieHolder;
        delete req.cookieHolder;
      }
    }
  );

  useSocketServer(io, { controllers: [__dirname + "/api/controllers/*.ts"] });

  return io;
};
