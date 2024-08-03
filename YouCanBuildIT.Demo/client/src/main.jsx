import "./utils/i18n";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { StrictMode, React } from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import AuthContextProvider from "./context/AuthContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
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
