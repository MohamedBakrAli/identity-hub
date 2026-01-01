import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AppConfig } from 'src/config/app.config';
import { JWTConfig } from 'src/config/jwt.config';
import ms from 'ms';

/**
 * Controller handling authentication endpoints.
 *
 * Provides endpoints for user registration, login, logout, and profile retrieval.
 * Uses HTTP-only cookies for secure JWT token storage.
 *
 * @class AuthController
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new user account.
   *
   * @param signUpDto - User registration data (email, password, name)
   * @param res - Express response object for setting cookies
   * @returns Success message
   * @throws {BadRequestException} If user already exists
   */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { access_token } = await this.authService.signUp(signUpDto);
    this.setAuthCookie(res, access_token);
    return { message: 'Signed up successfully' };
  }

  /**
   * Authenticate an existing user.
   *
   * @param signInDto - User credentials (email, password)
   * @param res - Express response object for setting cookies
   * @returns Success message
   * @throws {UnauthorizedException} If credentials are invalid
   */
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { access_token } = await this.authService.signIn(signInDto);
    this.setAuthCookie(res, access_token);
    return { message: 'Signed in successfully' };
  }

  /**
   * Get the authenticated user's profile.
   *
   * @param userId - User ID extracted from JWT token
   * @returns User profile data (id, email, name)
   * @throws {UnauthorizedException} If not authenticated
   */
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'User profile data' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @CurrentUser('id') userId: string,
  ): Promise<{ id: string; email: string; name: string }> {
    return this.authService.getProfile(userId);
  }

  /**
   * Sign out the current user by clearing the authentication cookie.
   *
   * @param res - Express response object for clearing cookies
   * @returns Success message
   */
  @ApiOperation({ summary: 'Logout current user' })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'Logout successful' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  signout(@Res({ passthrough: true }) res: Response): { message: string } {
    res.clearCookie(JWTConfig.cookieName);
    return { message: 'Signed out successfully' };
  }

  /**
   * Set the authentication cookie with the JWT token.
   *
   * Cookie configuration:
   * - httpOnly: Prevents XSS attacks
   * - secure: Only sent over HTTPS in production
   * - sameSite: Prevents CSRF attacks
   * - maxAge: Token expiration time
   *
   * @param res - Express response object
   * @param token - JWT access token
   */
  private setAuthCookie(res: Response, token: string): void {
    res.cookie(JWTConfig.cookieName, token, {
      httpOnly: true,
      secure: AppConfig.isProduction,
      sameSite: 'strict',
      maxAge: ms(JWTConfig.expiresIn),
    });
  }
}
