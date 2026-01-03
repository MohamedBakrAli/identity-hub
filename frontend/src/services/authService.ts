/**
 * @fileoverview Authentication service that provides a high-level interface
 * for authentication operations.
 * @module services/authService
 */

import {
  signinApi,
  signupApi,
  signoutApi,
  currentUserApi,
} from "../api/auth.api";
import type { User, SigninData, SignupData } from "../types/auth";

/**
 * Service class for managing user authentication.
 * Provides methods for signup, signin, signout, and fetching the current user.
 */
export default class AuthService {
  /**
   * Registers a new user account.
   *
   * @param data - The registration data
   */
  async signup(data: SignupData): Promise<void> {
    await signupApi(data);
  }

  /**
   * Authenticates a user with their credentials.
   *
   * @param data - The signin credentials
   */
  async signin(data: SigninData): Promise<void> {
    await signinApi(data);
  }

  /**
   * Signs out the current user.
   */
  async signout(): Promise<void> {
    await signoutApi();
  }

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns The current user, or null if not authenticated
   */
  async getCurrentUser(): Promise<User | null> {
    return await currentUserApi();
  }
}
