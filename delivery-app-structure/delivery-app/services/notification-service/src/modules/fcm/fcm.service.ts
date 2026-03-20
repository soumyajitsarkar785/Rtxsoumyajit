import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FcmService {
  async sendPushNotification(params: {
    token: string;
    title: string;
    body: string;
    data?: Record<string, string>;
  }) {
    const message: admin.messaging.Message = {
      token: params.token,
      notification: { title: params.title, body: params.body },
      data: params.data,
      android: { priority: 'high' },
      apns: { payload: { aps: { sound: 'default' } } },
    };
    return admin.messaging().send(message);
  }

  async sendToMultiple(tokens: string[], title: string, body: string) {
    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification: { title, body },
    };
    return admin.messaging().sendEachForMulticast(message);
  }
}
