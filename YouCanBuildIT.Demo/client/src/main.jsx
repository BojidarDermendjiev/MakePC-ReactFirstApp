import "./utils/i18n";
import App from "./App.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import AuthContextProvider from "./context/AuthContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
