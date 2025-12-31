/**
 * MongoDB connection configuration.
 */
export class DatabaseConfig {
  /** MongoDB connection string (env: MONGODB_URI, default: mongodb://localhost:27017/auth_db) */
  static get uri(): string {
    return process.env.MONGODB_URI ?? 'mongodb://localhost:27017/auth_db';
  }
}
