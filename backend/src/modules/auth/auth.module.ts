import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

/**
 * Authentication module.
 *
 * Provides user authentication functionality including:
 * - User registration (signup)
 * - User login (signin)
 * - User logout (signout)
 * - Profile retrieval
 *
 * JWT configuration is handled globally via JwtModule in AppModule.
 * Passwords are hashed using bcrypt before storage.
 *
 * @module AuthModule
 */
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
