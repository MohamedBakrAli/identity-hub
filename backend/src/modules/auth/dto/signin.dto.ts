import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object for user authentication.
 *
 * Validates incoming signin request data before processing.
 *
 * @class SignInDto
 */
export class SignInDto {
  /**
   * User's email address.
   * Must be a valid email format.
   */
  @ApiProperty({
    example: 'omar@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  /**
   * User's password.
   * Must not be empty.
   */
  @ApiProperty({
    example: 'SecureP@ss1',
    description: 'User password',
  })
  @IsNotEmpty()
  password: string;
}
