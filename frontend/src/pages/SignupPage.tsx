/**
 * @fileoverview Signup page component.
 * @module pages/SignupPage
 */

import type { FC } from "react";
import { Navbar } from "../components/Navbar";
import { SignupForm } from "../components/SignupForm";
import "./SignupPage.css";

/**
 * Signup page with navigation and registration form.
 */
export const SignupPage: FC = () => {
  return (
    <div className="signup-container">
      <Navbar />

      <main className="signup-content">
        <SignupForm />
      </main>
    </div>
  );
};

