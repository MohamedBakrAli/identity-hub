import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

/**
 * Data Transfer Object for user registration.
 *
 * Validates incoming signup request data before processing.
 *
 * @class SignUpDto
 */
export class SignUpDto {
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
   * User's display name.
   * Must be at least 3 characters long.
   */
  @ApiProperty({
    example: 'Omar Mohamed',
    description: 'User display name (min 3 characters)',
  })
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  /**
   * User's password.
   *
   * Requirements:
   * - Minimum 8 characters
   * - At least one letter (a-z, A-Z)
   * - At least one digit (0-9)
   * - At least one special character (@$!%*#?&)
   */
  @ApiProperty({
    example: 'SecureP@ss1',
    description:
      'Password (min 8 chars, must contain letter, digit, and special char)',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
