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
   *
   * @example "omar@example.com"
   */
  @IsEmail()
  email: string;

  /**
   * User's display name.
   * Must be at least 3 characters long.
   *
   * @example "Omar Mohamed"
   */
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
   *
   * @example "SecureP@ss1"
   */
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
