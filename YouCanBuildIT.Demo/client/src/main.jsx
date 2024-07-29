import "./utils/i18n";

import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { StrictMode, React } from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
