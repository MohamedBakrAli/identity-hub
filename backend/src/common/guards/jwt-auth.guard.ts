import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTConfig } from 'src/config/jwt.config';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies[JWTConfig.cookieName] as string;

    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const payload: Record<string, unknown> = this.jwtService.verify(token);
      request.authInfo = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
