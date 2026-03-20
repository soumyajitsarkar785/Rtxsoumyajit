export enum OrderStatus {
  PENDING           = 'PENDING',
  CONFIRMED         = 'CONFIRMED',
  PREPARING         = 'PREPARING',
  READY_FOR_PICKUP  = 'READY_FOR_PICKUP',
  AGENT_ASSIGNED    = 'AGENT_ASSIGNED',
  PICKED_UP         = 'PICKED_UP',
  ON_THE_WAY        = 'ON_THE_WAY',
  DELIVERED         = 'DELIVERED',
  CANCELLED         = 'CANCELLED',
  REFUNDED          = 'REFUNDED',
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  merchantId: string;
  agentId?: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  deliveryAddress: Address;
  estimatedDeliveryTime?: number; // minutes
  createdAt: Date;
}

export interface Address {
  label: string;
  street: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
}
