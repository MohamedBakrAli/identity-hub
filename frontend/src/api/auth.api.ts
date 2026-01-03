/**
 * @fileoverview Low-level API functions for authentication endpoints.
 * @module api/auth
 */

import type { SigninData, SignupData, User } from "../types/auth";
import { API_AUTH_URL } from "../config/api";

/**
 * Authenticates a user with email and password.
 *
 * @param data - The signin credentials
 * @throws {Error} When authentication fails
 */
export const signinApi = async (data: SigninData): Promise<void> => {
  const res = await fetch(`${API_AUTH_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error?.message || "Login failed");
  }
};

/**
 * Registers a new user account.
 *
 * @param data - The registration data including name, email, and password
 * @throws {Error} When registration fails
 */
export const signupApi = async (data: SignupData): Promise<void> => {
  const res = await fetch(`${API_AUTH_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error?.message || "Registration failed");
  }
};

/**
 * Signs out the current user by invalidating their session.
 *
 * @throws {Error} When signout fails
 */
export const signoutApi = async (): Promise<void> => {
  const res = await fetch(`${API_AUTH_URL}/signout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error?.message || "Signout failed");
  }
};

/**
 * Fetches the currently authenticated user's profile.
 *
 * @returns The current user data, or null if not authenticated
 */
export const currentUserApi = async (): Promise<User | null> => {
  const res = await fetch(`${API_AUTH_URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  const responseData = await res.json();
  return responseData.data as User;
};
