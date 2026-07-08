import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { LanguageProvider } from "./context/LanguageContext";
import { PHCProvider } from "./context/PHCContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <PHCProvider>
          <App />
        </PHCProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);