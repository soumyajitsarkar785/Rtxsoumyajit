import { IsString, IsEnum, IsOptional, IsEmail, MinLength } from 'class-validator';
import { UserRole } from '@delivery/shared-types';

export class RegisterDto {
  @IsString() name: string;
  @IsString() phone: string;
  @IsOptional() @IsEmail() email?: string;
  @IsString() @MinLength(6) password: string;
  @IsEnum(UserRole) role: UserRole;
}

export class LoginDto {
  @IsString() phone: string;
  @IsString() password: string;
}

export class RefreshTokenDto {
  @IsString() refreshToken: string;
}
