import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";

if (typeof window !== "undefined") {
  window.addEventListener('error', (e) => {
    if (
      e.message?.includes('Failed to fetch dynamically imported module') ||
      e.message?.includes('Expected a JavaScript module script')
    ) {
      const lastReload = sessionStorage.getItem('chunk-reload-ts');
      const now = Date.now();
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem('chunk-reload-ts', String(now));
        window.location.reload();
      }
    }
  });
}

const rootElement = typeof document !== "undefined" ? document.getElementById("root") : null;

if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
  <BrowserRouter>
        <I18nLanguageProvider>
          <App />
        </I18nLanguageProvider>
  </BrowserRouter>
);

// Use hydrateRoot if HTML was pre-rendered, otherwise use createRoot
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}