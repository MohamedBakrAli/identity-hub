/**
 * @fileoverview Navigation bar component.
 * @module components/Navbar
 */

import type { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

/**
 * Navigation bar with brand logo and authentication controls.
 * Shows login/signup buttons when logged out, user info when logged in.
 */
export const Navbar: FC = () => {
  const { user, isLoggedIn, signout } = useAuth();

  const handleSignout = async () => {
    await signout();
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <a href="/">
          <h1>IdentityHub</h1>
        </a>
      </div>
      <nav className="navbar-nav">
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
  );
};
