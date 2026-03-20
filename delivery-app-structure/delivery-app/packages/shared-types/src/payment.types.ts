export enum PaymentMethod {
  BKASH       = 'BKASH',
  SSLCOMMERZ  = 'SSLCOMMERZ',
  STRIPE      = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  WALLET      = 'WALLET',
}

export enum PaymentStatus {
  PENDING   = 'PENDING',
  SUCCESS   = 'SUCCESS',
  FAILED    = 'FAILED',
  REFUNDED  = 'REFUNDED',
}

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transactionId?: string;
  createdAt: Date;
}
