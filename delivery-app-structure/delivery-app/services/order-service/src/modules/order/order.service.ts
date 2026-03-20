import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderStateMachine } from '../../state-machine/order.state-machine';
import { OrderStatus } from '@delivery/shared-types';
import { KafkaService } from './kafka.service';
import { OrderEvent } from '../../events/order.events';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private kafkaService: KafkaService,
  ) {}

  async createOrder(dto: Partial<OrderEntity>): Promise<OrderEntity> {
    const order = this.orderRepo.create({ ...dto, status: OrderStatus.PENDING });
    const savedOrder = await this.orderRepo.save(order);
    await this.kafkaService.emit('orders', {
      type: OrderEvent.ORDER_CREATED,
      orderId: savedOrder.id,
      customerId: savedOrder.customerId,
      merchantId: savedOrder.merchantId,
      totalAmount: savedOrder.totalAmount,
      deliveryAddress: savedOrder.deliveryAddress,
    });
    return savedOrder;
  }

  async updateStatus(orderId: string, newStatus: OrderStatus): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    if (!OrderStateMachine.canTransition(order.status, newStatus)) {
      throw new BadRequestException(
        `Cannot change status from ${order.status} to ${newStatus}`
      );
    }

    order.status = newStatus;
    const savedOrder = await this.orderRepo.save(order);

    let eventType: OrderEvent | null = null;
    switch (newStatus) {
      case OrderStatus.CONFIRMED:
        eventType = OrderEvent.ORDER_CONFIRMED;
        break;
      case OrderStatus.READY_FOR_PICKUP:
        eventType = OrderEvent.ORDER_READY;
        break;
      case OrderStatus.AGENT_ASSIGNED:
        eventType = OrderEvent.AGENT_ASSIGNED;
        break;
      case OrderStatus.DELIVERED:
        eventType = OrderEvent.ORDER_DELIVERED;
        break;
      case OrderStatus.CANCELLED:
        eventType = OrderEvent.ORDER_CANCELLED;
        break;
    }

    if (eventType) {
      await this.kafkaService.emit('orders', {
        type: eventType,
        orderId: savedOrder.id,
        customerId: savedOrder.customerId,
        agentId: savedOrder.agentId,
        customerFcmToken: savedOrder.customerFcmToken, // assuming the entity has this
      });
    }

    return savedOrder;
  }

  async getOrdersByCustomer(customerId: string): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      where: { customerId },
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveOrdersForAgent(agentId: string): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      where: { agentId, status: OrderStatus.ON_THE_WAY },
    });
  }
}
