import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  socket = io(process.env.EXPO_PUBLIC_WS_URL || 'http://localhost:3013', {
    auth: { token },
    transports: ['websocket'],
  });
  return socket;
};

export const subscribeToOrderTracking = (
  orderId: string,
  onLocation: (loc: { lat: number; lng: number }) => void
) => {
  socket?.emit('track:order', { orderId });
  socket?.on(`order:${orderId}:location`, onLocation);
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
