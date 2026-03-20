# Developer Onboarding Guide

## Prerequisites
- Node.js 20+
- Docker + Docker Compose
- npm 10+

## Setup

```bash
# 1. Clone repo
git clone https://github.com/your-org/delivery-app.git
cd delivery-app

# 2. Install all dependencies (all workspaces)
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your keys

# 4. Start infrastructure (DB, Redis, Kafka)
npm run docker:up

# 5. Start all services in dev mode
npm run dev
```

## Service URLs (local)
| Service | URL |
|---------|-----|
| API Gateway | http://localhost:8080 |
| Auth Service | http://localhost:3010 |
| Order Service | http://localhost:3012 |
| Tracking (WS) | ws://localhost:3013 |
| Merchant Web | http://localhost:3000 |
| Admin Web | http://localhost:3001 |

## Key Commands
```bash
npm run dev          # Start everything
npm run test         # Run all tests
npm run docker:up    # Start DB + services
npm run docker:down  # Stop everything
```
