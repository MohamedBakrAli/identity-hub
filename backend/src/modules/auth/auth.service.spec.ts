import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/user.schema';

// Mock bcrypt
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    _id: { toString: () => '507f1f77bcf86cd799439011' },
    email: 'omar@example.com',
    name: 'Omar Mohamed',
    password: '$2b$10$hashedpassword',
  } as unknown as UserDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
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

    it('should successfully register a new user', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2b$10$hashedpassword');
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await authService.signUp(signUpDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(signUpDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(signUpDto.password, 10);
      expect(usersService.create).toHaveBeenCalledWith({
        ...signUpDto,
        password: '$2b$10$hashedpassword',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: '507f1f77bcf86cd799439011',
        email: signUpDto.email,
      });
      expect(result).toEqual({ access_token: 'mock-jwt-token' });
    });

    it('should throw BadRequestException if user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.signUp(signUpDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(authService.signUp(signUpDto)).rejects.toThrow(
        'User already exists',
      );
      expect(usersService.create).not.toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'omar@example.com',
      password: 'SecureP@ss1',
    };

    it('should successfully authenticate a user', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await authService.signIn(signInDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(signInDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        signInDto.password,
        mockUser.password,
      );
      expect(result).toEqual({ access_token: 'mock-jwt-token' });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(authService.signIn(signInDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(authService.signIn(signInDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('getProfile', () => {
    it('should return user profile without password', async () => {
      usersService.findById.mockResolvedValue(mockUser);

      const result = await authService.getProfile('507f1f77bcf86cd799439011');

      expect(usersService.findById).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual({
        id: '507f1f77bcf86cd799439011',
        email: 'omar@example.com',
        name: 'Omar Mohamed',
      });
      expect(result).not.toHaveProperty('password');
    });
  });
});

