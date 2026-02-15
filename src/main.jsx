import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";
import SmoothScrollProvider from "./components/SmoothScrollProvider.jsx";
let reloaded = false;

window.addEventListener('error', (e) => {
  if (
    !reloaded &&
    (
      e.message?.includes('Failed to fetch dynamically imported module') ||
      e.message?.includes('Expected a JavaScript module script')
    )
  ) {
    reloaded = true;
    window.location.reload();
  }
});
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <I18nLanguageProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </I18nLanguageProvider>
  </BrowserRouter>
);