import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SSLCommerzService {
  private readonly baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://securepay.sslcommerz.com'
    : 'https://sandbox.sslcommerz.com';

  async initiatePayment(params: {
    orderId: string; amount: number;
    customerName: string; customerPhone: string;
    successUrl: string; failUrl: string; cancelUrl: string;
  }) {
    const { data } = await axios.post(`${this.baseUrl}/gwprocess/v4/api.php`, {
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
      total_amount: params.amount,
      currency: 'BDT',
      tran_id: params.orderId,
      success_url: params.successUrl,
      fail_url: params.failUrl,
      cancel_url: params.cancelUrl,
      cus_name: params.customerName,
      cus_phone: params.customerPhone,
    });
    return data;
  }
}
