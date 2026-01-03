/**
 * @fileoverview Home page component.
 * @module pages/Home
 */

import type { FC } from "react";

/**
 * Main home page displayed after authentication.
 * Serves as the landing page for authenticated users.
 */
export const HomePage: FC = () => {
  return (
    <div>
      <h1>Welcome to the Auth System</h1>
    </div>
  );
};
