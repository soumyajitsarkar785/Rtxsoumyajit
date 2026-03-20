import {
  WebSocketGateway, WebSocketServer,
  SubscribeMessage, MessageBody, ConnectedSocket,
  OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/tracking' })
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  @SubscribeMessage('agent:location')
  handleAgentLocation(
    @MessageBody() data: { agentId: string; orderId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    // Store in Redis, broadcast to customer
    this.server.to(`order:${data.orderId}`).emit(
      `order:${data.orderId}:location`,
      { lat: data.lat, lng: data.lng, timestamp: new Date() },
    );
  }

  @SubscribeMessage('track:order')
  handleTrackOrder(
    @MessageBody() data: { orderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`order:${data.orderId}`);
  }
}
