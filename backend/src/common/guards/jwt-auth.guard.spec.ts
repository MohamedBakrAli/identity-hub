import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JWTConfig } from 'src/config/jwt.config';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: jest.Mocked<JwtService>;

  const createMockExecutionContext = (cookies: Record<string, string> = {}) => {
    const mockRequest = {
      cookies,
      authInfo: undefined,
    };

    return {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    it('should return true and set authInfo for valid token', () => {
      const mockPayload = { id: '507f1f77bcf86cd799439011', email: 'omar@example.com' };
      jwtService.verify.mockReturnValue(mockPayload);

      const context = createMockExecutionContext({
        [JWTConfig.cookieName]: 'valid-jwt-token',
      });

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(jwtService.verify).toHaveBeenCalledWith('valid-jwt-token');

      const request = context.switchToHttp().getRequest();
      expect(request.authInfo).toEqual(mockPayload);
    });

    it('should throw UnauthorizedException when token is missing', () => {
      const context = createMockExecutionContext({});

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Authentication token missing',
      );
      expect(jwtService.verify).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when token is empty string', () => {
      const context = createMockExecutionContext({
        [JWTConfig.cookieName]: '',
      });

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Authentication token missing',
      );
    });

    it('should throw UnauthorizedException when token is invalid', () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const context = createMockExecutionContext({
        [JWTConfig.cookieName]: 'invalid-jwt-token',
      });

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Invalid or expired token',
      );
    });

    it('should throw UnauthorizedException when token is expired', () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('jwt expired');
      });

      const context = createMockExecutionContext({
        [JWTConfig.cookieName]: 'expired-jwt-token',
      });

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
      expect(() => guard.canActivate(context)).toThrow(
        'Invalid or expired token',
      );
    });
  });
});

