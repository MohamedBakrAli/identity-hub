/**
 * JWT authentication configuration.
 */
export class JWTConfig {
  /** Secret key for signing tokens (env: JWT_SECRET) */
  static get secret(): string {
    return process.env.JWT_SECRET ?? 'default_secret';
  }

  /** Token expiration time (env: JWT_EXPIRES_IN, default: 1 hour) */
  static get expiresIn(): string {
    return process.env.JWT_EXPIRES_IN ?? '3600s';
  }
}
