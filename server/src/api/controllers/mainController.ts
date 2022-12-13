import {
  ConnectedSocket,
  OnConnect,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";

const SESSION_RELOAD_INTERVAL = 30 * 1000;
@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    const req = socket.request;

    socket.use((__, next) => {
      req.session.reload((err) => {
        if (err) {
          socket.disconnect();
        } else {
          next();
        }
      });
    });

    // // and then simply
    // socket.on("my event", () => {
    //   req.session.count++;
    //   req.session.save();
    // });

    const timer = setInterval(() => {
      console.log(`Reloading session ${req.session.id}`);
      socket.request.session.reload((err) => {
        if (err) {
          socket.conn.close();
        }
      });
    }, SESSION_RELOAD_INTERVAL);

    socket.on("disconnect", () => {
      clearInterval(timer);
    });

    console.log("New Socket connected: ", socket.id);

    console.log(socket.request.session);
  }
}
