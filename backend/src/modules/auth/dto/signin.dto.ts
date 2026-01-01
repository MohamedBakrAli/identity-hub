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
   *
   * @example "omar@example.com"
   */
  @IsEmail()
  email: string;

  /**
   * User's password.
   * Must not be empty.
   *
   * @example "SecureP@ss1"
   */
  @IsNotEmpty()
  password: string;
}
