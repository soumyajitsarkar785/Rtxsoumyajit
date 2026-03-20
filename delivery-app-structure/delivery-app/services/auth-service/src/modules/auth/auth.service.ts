import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 12);
    // Save user to DB, then:
    return this.generateTokens({ id: 'user_id', role: dto.role });
  }

  async login(dto: LoginDto) {
    // Verify user from DB, check password, then:
    return this.generateTokens({ id: 'user_id', role: 'CUSTOMER' });
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return this.generateTokens({ id: payload.sub, role: payload.role });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // Blacklist in Redis
    return { success: true };
  }

  private generateTokens(payload: { id: string; role: string }) {
    return {
      accessToken: this.jwtService.sign(
        { sub: payload.id, role: payload.role },
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
      ),
      refreshToken: this.jwtService.sign(
        { sub: payload.id },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }
      ),
    };
  }
}
