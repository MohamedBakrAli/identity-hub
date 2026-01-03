/**
 * @fileoverview Home page component.
 * @module pages/Home
 */

import type { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import "./Home.css";

/**
 * Main home page with navigation header.
 * Shows login/signup buttons when logged out, user info when logged in.
 */
export const HomePage: FC = () => {
  const { user, isLoggedIn, signout } = useAuth();

  const handleSignout = async () => {
    await signout();
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-brand">
          <h1>IdentityHub</h1>
        </div>
        <nav className="header-nav">
          {isLoggedIn ? (
            <div className="user-section">
              <div className="user-card">
                <span className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
                <div className="user-info">
                  <span className="user-name">{user?.name}</span>
                  <span className="user-email">{user?.email}</span>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={handleSignout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/signin" className="btn btn-secondary">
                Sign In
              </a>
              <a href="/signup" className="btn btn-primary">
                Sign Up
              </a>
            </div>
          )}
        </nav>
      </header>

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
