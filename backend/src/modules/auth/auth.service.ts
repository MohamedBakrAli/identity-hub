import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserDocument } from '../users/user.schema';

/**
 * Service handling authentication business logic.
 *
 * Responsible for user registration, login validation, password hashing,
 * and JWT token generation.
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /** Number of salt rounds for bcrypt password hashing */
  private readonly bcryptSaltRounds = 10;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user account.
   *
   * Validates that the email is not already registered, hashes the password
   * using bcrypt, creates the user, and generates a JWT access token.
   *
   * @param signUpDto - User registration data (email, password, name)
   * @returns Object containing the JWT access token
   * @throws {BadRequestException} If a user with the email already exists
   */
  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      signUpDto.password,
      this.bcryptSaltRounds,
    );
    const newUser = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    });
    return this.generateAccessToken(newUser);
  }

  /**
   * Authenticate a user and generate access token.
   *
   * Validates the user credentials and generates a JWT access token
   * upon successful authentication.
   *
   * @param signInDto - User credentials (email, password)
   * @returns Object containing the JWT access token
   * @throws {UnauthorizedException} If credentials are invalid
   */
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    return this.generateAccessToken(user);
  }

  /**
   * Validate user credentials.
   *
   * Looks up the user by email and compares the provided password
   * against the stored bcrypt hash.
   *
   * @param email - User's email address
   * @param password - Plain text password to validate
   * @returns The validated user document
   * @throws {UnauthorizedException} If user not found or password invalid
   */
  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  /**
   * Generate a JWT access token for the user.
   *
   * Creates a signed JWT containing the user's ID and email as payload.
   * Token expiration is configured globally via JWTConfig.
   *
   * @param user - The authenticated user document
   * @returns Object containing the signed JWT access token
   */
  private generateAccessToken(user: UserDocument): { access_token: string } {
    const payload = { id: user._id.toString(), email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Get user profile by ID
   * @param userId - The user ID from JWT
   * @returns User profile (without password)
   */
  async getProfile(
    userId: string,
  ): Promise<{ id: string; email: string; name: string }> {
    const user = await this.usersService.findById(userId);
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }
}
