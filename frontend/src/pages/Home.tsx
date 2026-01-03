/**
 * @fileoverview Home page component.
 * @module pages/Home
 */

import type { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "../components/Navbar";
import "./Home.css";

/**
 * Main home page with navigation header.
 * Shows welcome message based on authentication state.
 */
export const HomePage: FC = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="home-container">
      <Navbar />

      <main className="main-content">
        <div className="hero">
          <h2>Welcome to IdentityHub</h2>
          <p>Your secure authentication solution</p>
          {isLoggedIn ? (
            <p className="welcome-message">
              Hello, {user?.name}! You're signed in.
            </p>
          ) : (
            <p className="welcome-message">Sign in to access your account.</p>
          )}
        </div>
      </main>
    </div>
  );
};
