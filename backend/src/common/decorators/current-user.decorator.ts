import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface JwtPayload {
  id: string;
  email: string;
}

/**
 * Decorator to extract the current user from the JWT payload.
 * Use with @UseGuards(JwtAuthGuard).
 *
 * @example
 * @Get('profile')
 * @UseGuards(JwtAuthGuard)
 * getProfile(@CurrentUser() user: JwtPayload) {
 *   return user;
 * }
 */
export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayload | undefined,
    ctx: ExecutionContext,
  ): JwtPayload | string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.authInfo as JwtPayload;
    return data ? user[data] : user;
  },
);
