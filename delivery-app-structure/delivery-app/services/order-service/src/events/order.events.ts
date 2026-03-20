export enum OrderEvent {
  ORDER_CREATED   = 'order.created',
  ORDER_CONFIRMED = 'order.confirmed',
  ORDER_READY     = 'order.ready_for_pickup',
  AGENT_ASSIGNED  = 'order.agent_assigned',
  ORDER_DELIVERED = 'order.delivered',
  ORDER_CANCELLED = 'order.cancelled',
}
