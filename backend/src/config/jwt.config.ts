import { StringValue } from 'ms';

/**
 * JWT authentication configuration.
 */
export class JWTConfig {
  /** Secret key for signing tokens (env: JWT_SECRET) */
  static get secret(): string {
    return process.env.JWT_SECRET ?? 'default_secret';
  }

  /** Token expiration time (env: JWT_EXPIRES_IN, default: 1 hour) */
  static get expiresIn(): StringValue {
    return (process.env.JWT_EXPIRES_IN ?? '1h') as StringValue;
  }

  /** Name of the cookie for authentication (default: Authentication) */
  static get cookieName(): string {
    return 'Authentication';
  }
}
