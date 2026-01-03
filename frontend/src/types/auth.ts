/**
 * @fileoverview Authentication type definitions for the application.
 * @module types/auth
 */

/**
 * Data required for user registration.
 */
export type SignupData = {
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
};

/**
 * Data required for user authentication.
 */
export type SigninData = {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
};

/**
 * Represents an authenticated user in the system.
 */
export type User = {
  /** Unique identifier for the user */
  id: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
};
