/**
 * @fileoverview Authentication provider component that manages auth state.
 * @module context/AuthProvider
 */

import { useState, useEffect, type ReactNode } from "react";
import type { SigninData, SignupData, User } from "../types/auth";
import AuthService from "../services/authService";
import { AuthContext } from "./authContext";

const authService = new AuthService();

/**
 * Props for the AuthProvider component.
 */
interface AuthProviderProps {
  /** Child components that will have access to the auth context */
  children: ReactNode;
}

/**
 * Provides authentication state and methods to the component tree.
 * Automatically fetches the current user on mount.
 *
 * @param props - Component props
 * @returns The provider component wrapping children
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const newUser = await authService.getCurrentUser();
      setUser(newUser);
    };
    fetchUser();
  }, []);

  /**
   * Registers a new user and updates the auth state.
   */
  const signup = async (data: SignupData) => {
    await authService.signup(data);
    await refreshUser();
  };

  /**
   * Authenticates a user and updates the auth state.
   */
  const signin = async (data: SigninData) => {
    await authService.signin(data);
    await refreshUser();
  };

  /**
   * Signs out the current user and clears the auth state.
   */
  const signout = async () => {
    await authService.signout();
    setUser(null);
  };

  /**
   * Refreshes the current user data from the server.
   */
  const refreshUser = async () => {
    const newUser = await authService.getCurrentUser();
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        signup,
        signin,
        signout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
