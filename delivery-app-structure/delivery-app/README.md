# 🚀 Delivery App — Monorepo

Production-ready delivery platform built with Turborepo.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start all services with Docker
npm run docker:up

# 4. Start development
npm run dev
```

## Apps
| App | Tech | Port |
|-----|------|------|
| customer-app | React Native (Expo) | — |
| agent-app | React Native (Expo) | — |
| merchant-web | Next.js 14 | 3000 |
| admin-web | Next.js 14 | 3001 |

## Services
| Service | Port |
|---------|------|
| api-gateway | 8080 |
| auth-service | 3010 |
| user-service | 3011 |
| order-service | 3012 |
| tracking-service | 3013 |
| payment-service | 3014 |
| notification-service | 3015 |
| admin-service | 3016 |

## Docs
See `/docs` folder for API specs and architecture diagrams.
