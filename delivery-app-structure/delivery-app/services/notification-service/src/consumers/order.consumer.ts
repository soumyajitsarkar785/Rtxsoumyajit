import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { FcmService } from '../modules/fcm/fcm.service';
import { OrderEvent } from '../../order-service/src/events/order.events';

@Injectable()
export class OrderConsumer implements OnModuleInit {
  private kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] });
  private consumer = this.kafka.consumer({ groupId: 'notification-service' });

  constructor(private readonly fcmService: FcmService) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'orders', fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const event = JSON.parse(message.value!.toString());
        await this.handleOrderEvent(event);
      },
    });
  }

  private async handleOrderEvent(event: any) {
    switch (event.type) {
      case OrderEvent.ORDER_CONFIRMED:
        await this.fcmService.sendPushNotification({
          token: event.customerFcmToken,
          title: 'Order Confirmed!',
          body: `Your order #${event.orderId} has been confirmed.`,
          data: { orderId: event.orderId, screen: 'OrderTracking' },
        });
        break;
      case OrderEvent.ORDER_DELIVERED:
        await this.fcmService.sendPushNotification({
          token: event.customerFcmToken,
          title: 'Delivered!',
          body: 'Your order has been delivered. Enjoy!',
          data: { orderId: event.orderId, screen: 'OrderHistory' },
        });
        break;
    }
  }
}
