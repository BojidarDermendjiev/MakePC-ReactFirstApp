import "./utils/i18n";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import { CartContextProvider } from "./context/CartContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
