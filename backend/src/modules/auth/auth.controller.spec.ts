import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTConfig } from 'src/config/jwt.config';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            getProfile: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    const signUpDto = {
      email: 'omar@example.com',
      name: 'Omar Mohamed',
      password: 'SecureP@ss1',
    };

    it('should register a new user and set auth cookie', async () => {
      authService.signUp.mockResolvedValue({ access_token: 'mock-jwt-token' });

      const result = await authController.signUp(signUpDto, mockResponse);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        JWTConfig.cookieName,
        'mock-jwt-token',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'strict',
        }),
      );
      expect(result).toEqual({ message: 'Signed up successfully' });
    });
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'omar@example.com',
      password: 'SecureP@ss1',
    };

    it('should authenticate user and set auth cookie', async () => {
      authService.signIn.mockResolvedValue({ access_token: 'mock-jwt-token' });

      const result = await authController.signIn(signInDto, mockResponse);

      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        JWTConfig.cookieName,
        'mock-jwt-token',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'strict',
        }),
      );
      expect(result).toEqual({ message: 'Signed in successfully' });
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const mockProfile = {
        id: '507f1f77bcf86cd799439011',
        email: 'omar@example.com',
        name: 'Omar Mohamed',
      };
      authService.getProfile.mockResolvedValue(mockProfile);

      const result = await authController.getProfile('507f1f77bcf86cd799439011');

      expect(authService.getProfile).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockProfile);
    });
  });

  describe('signout', () => {
    it('should clear auth cookie and return success message', () => {
      const result = authController.signout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(JWTConfig.cookieName);
      expect(result).toEqual({ message: 'Signed out successfully' });
    });
  });
});

