import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

class SocketService {
  private static instance: SocketService;

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public socket: Socket | null = null;

  public connect(url: string): Promise<Socket> {
    return new Promise((rs, rj) => {
      this.socket = io(url);

      if (!this.socket) return rj();

      this.socket.on('connect', () => {
        if (!this.socket) return rj('Socket was null');
        console.log(`Connected to server ${url} via socket ${this.socket.id}`);
        rs(this.socket);
      });

      this.socket.on('connect_error', (err) => {
        console.log('Connection error: ', err);
        rj(err);
      });
    });
  }
}

export default SocketService.getInstance();
