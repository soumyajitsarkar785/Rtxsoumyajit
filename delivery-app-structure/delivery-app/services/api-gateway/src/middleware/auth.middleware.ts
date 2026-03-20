import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const PUBLIC_ROUTES = [
  'POST /api/v1/auth/login',
  'POST /api/v1/auth/register',
  'POST /api/v1/auth/refresh',
];

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const routeKey = `${req.method} ${req.path}`;
    if (PUBLIC_ROUTES.includes(routeKey)) return next();

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      (req as any).user = { id: payload.sub, role: payload.role };
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
