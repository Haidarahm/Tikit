import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";
import SmoothScrollProvider from "./components/SmoothScrollProvider.jsx";

let reloaded = false;

// Guard window/document access for prerendering compatibility
if (typeof window !== "undefined") {
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
}

const rootElement = typeof document !== "undefined" ? document.getElementById("root") : null;

if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
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

// Use hydrateRoot if HTML was pre-rendered, otherwise use createRoot
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}