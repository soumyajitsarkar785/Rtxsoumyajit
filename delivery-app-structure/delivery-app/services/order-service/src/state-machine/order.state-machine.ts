import { OrderStatus } from '@delivery/shared-types';

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]:          [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]:        [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  [OrderStatus.PREPARING]:        [OrderStatus.READY_FOR_PICKUP],
  [OrderStatus.READY_FOR_PICKUP]: [OrderStatus.AGENT_ASSIGNED],
  [OrderStatus.AGENT_ASSIGNED]:   [OrderStatus.PICKED_UP],
  [OrderStatus.PICKED_UP]:        [OrderStatus.ON_THE_WAY],
  [OrderStatus.ON_THE_WAY]:       [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]:        [],
  [OrderStatus.CANCELLED]:        [OrderStatus.REFUNDED],
  [OrderStatus.REFUNDED]:         [],
};

export class OrderStateMachine {
  static canTransition(from: OrderStatus, to: OrderStatus): boolean {
    return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
  }
  static transition(current: OrderStatus, next: OrderStatus): OrderStatus {
    if (!this.canTransition(current, next))
      throw new Error(`Invalid: ${current} → ${next}`);
    return next;
  }
}
