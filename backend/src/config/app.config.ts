/**
 * Application-level configuration.
 */
export class AppConfig {
  /** Server port (env: PORT, default: 3000) */
  static get port(): number {
    return Number(process.env.PORT ?? 3000);
  }

  /** Environment mode (env: NODE_ENV, default: development) */
  static get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  /** Whether the environment is production */
  static get isProduction(): boolean {
    return this.nodeEnv.toLowerCase().trim() === 'production';
  }
}
