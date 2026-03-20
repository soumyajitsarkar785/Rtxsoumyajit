import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '@delivery/shared-types';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customerId: string;

  @Column('uuid')
  merchantId: string;

  @Column('uuid', { nullable: true })
  agentId?: string;

  @Column('jsonb')
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  deliveryFee: number;

  @Column('jsonb')
  deliveryAddress: { label: string; street: string; area: string; city: string; lat: number; lng: number };

  @Column({ nullable: true })
  estimatedDeliveryTime?: number;

  @Column({ nullable: true })
  customerFcmToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
