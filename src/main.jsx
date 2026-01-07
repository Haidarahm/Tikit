import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";
import SmoothScrollProvider from "./components/SmoothScrollProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <I18nLanguageProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </I18nLanguageProvider>
    </StrictMode>
  </BrowserRouter>
);