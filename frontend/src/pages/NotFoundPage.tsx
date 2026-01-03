/**
 * @fileoverview 404 Not Found page component.
 * @module pages/NotFoundPage
 */

import type { FC } from "react";
import { Navbar } from "../components/Navbar";
import "./NotFoundPage.css";

/**
 * 404 Not Found page displayed for unmatched routes.
 */
export const NotFoundPage: FC = () => {
  return (
    <div className="notfound-container">
      <Navbar />

      <main className="notfound-content">
        <div className="notfound-card">
          <span className="notfound-code">404</span>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <a href="/" className="btn btn-primary">
            Go Home
          </a>
        </div>
      </main>
    </div>
  );
};

