import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { StrictMode, React } from "react";
import { BrowserRouter } from "react-router-dom";

import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
