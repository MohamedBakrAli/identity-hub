/**
 * @fileoverview Custom hook for accessing authentication context.
 * @module hooks/useAuth
 */

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/authContext";

/**
 * Hook to access the authentication context.
 * Provides access to the current user and authentication methods.
 *
 * @returns The authentication context value
 * @throws {Error} When used outside of an AuthProvider
 *
 * @example
 * ```tsx
 * const { user, isLoggedIn, signin, signout } = useAuth();
 *
 * if (isLoggedIn) {
 *   console.log(`Hello, ${user.name}!`);
 * }
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
