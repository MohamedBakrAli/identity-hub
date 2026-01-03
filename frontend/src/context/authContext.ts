/**
 * @fileoverview Authentication context definition for React context API.
 * @module context/authContext
 */

import { createContext } from "react";
import type { SigninData, SignupData, User } from "../types/auth";

/**
 * Shape of the authentication context value.
 * Provides user state and authentication methods to consuming components.
 */
export interface AuthContextType {
  /** The currently authenticated user, or null if not logged in */
  user: User | null;
  /** Whether a user is currently logged in */
  isLoggedIn: boolean;
  /**
   * Registers a new user and updates the auth state.
   * @param data - The registration data
   */
  signup: (data: SignupData) => Promise<void>;
  /**
   * Authenticates a user and updates the auth state.
   * @param data - The signin credentials
   */
  signin: (data: SigninData) => Promise<void>;
  /** Signs out the current user and clears the auth state. */
  signout: () => Promise<void>;
  /** Refreshes the current user data from the server. */
  refreshUser: () => Promise<void>;
}

/**
 * React context for authentication state and methods.
 * Must be used within an AuthProvider component.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
