# Architecture Overview

## Pattern: Microservices Monorepo (Turborepo)

```
Client → API Gateway (Nginx) → Microservices → Databases
                                     ↕
                               Kafka (events)
                                     ↕
                         Notification Service
```

## Data Flow: Order Placement
1. Customer places order → `POST /api/v1/orders`
2. API Gateway validates JWT, routes to `order-service`
3. `order-service` creates order (PENDING), emits `order.created` to Kafka
4. `notification-service` consumes event → sends push to merchant
5. Merchant confirms → `order-service` transitions state to CONFIRMED
6. `tracking-service` assigns agent, starts WebSocket session
7. Agent picks up → broadcasts GPS every 5s via Socket.io
8. Customer app receives live location updates
9. On delivery → `payment-service` settles, `notification-service` sends receipt

## State Machine: Order Status
PENDING → CONFIRMED → PREPARING → READY_FOR_PICKUP
→ AGENT_ASSIGNED → PICKED_UP → ON_THE_WAY → DELIVERED

## Databases Per Service
| Service     | DB                        | Why |
|-------------|---------------------------|-----|
| auth        | PostgreSQL + Redis        | Sessions + token blacklist |
| user        | PostgreSQL                | Relational, ACID |
| order       | PostgreSQL                | Transactions critical |
| tracking    | MongoDB + Redis           | High-frequency writes |
| payment     | PostgreSQL                | Financial data, ACID |
| notification| Stateless (Kafka consumer)| No persistence needed |
