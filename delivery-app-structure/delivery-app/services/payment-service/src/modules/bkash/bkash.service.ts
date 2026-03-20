import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BkashService {
  private readonly baseUrl = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized';

  async getToken(): Promise<string> {
    const { data } = await axios.post(`${this.baseUrl}/checkout/token/grant`, {
      app_key: process.env.BKASH_APP_KEY,
      app_secret: process.env.BKASH_APP_SECRET,
    }, {
      headers: {
        username: process.env.BKASH_USERNAME,
        password: process.env.BKASH_PASSWORD,
      },
    });
    return data.id_token;
  }

  async createPayment(amount: number, orderId: string) {
    const token = await this.getToken();
    const { data } = await axios.post(`${this.baseUrl}/checkout/create`, {
      mode: '0011',
      payerReference: orderId,
      callbackURL: process.env.BKASH_CALLBACK_URL,
      amount: amount.toString(),
      currency: 'BDT',
      intent: 'sale',
      merchantInvoiceNumber: orderId,
    }, {
      headers: { Authorization: token, 'X-APP-Key': process.env.BKASH_APP_KEY },
    });
    return data;
  }
}
