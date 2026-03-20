import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
export const connectSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(process.env.EXPO_PUBLIC_WS_URL || 'http://localhost:3013', {
      auth: { token }, transports: ['websocket'],
    });
  }
  return socket;
};
