/**
 * @fileoverview Root application component with routing configuration.
 * @module App
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { SignupPage } from "./pages/SignupPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
