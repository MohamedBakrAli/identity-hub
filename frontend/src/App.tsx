/**
 * @fileoverview Root application component with routing configuration.
 * @module App
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";

/**
 * Root application component.
 * Configures the router and defines application routes.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
