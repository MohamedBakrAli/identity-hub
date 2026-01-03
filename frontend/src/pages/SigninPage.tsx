/**
 * @fileoverview Signin page component.
 * @module pages/SigninPage
 */

import type { FC } from "react";
import { Navbar } from "../components/Navbar";
import { SigninForm } from "../components/SigninForm";
import "./SigninPage.css";

/**
 * Signin page with navigation and login form.
 */
export const SigninPage: FC = () => {
  return (
    <div className="signin-container">
      <Navbar />

      <main className="signin-content">
        <SigninForm />
      </main>
    </div>
  );
};

