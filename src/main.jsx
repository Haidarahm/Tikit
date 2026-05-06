import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import i18n, { initI18n } from "./locales/i18n";
import { initReactI18next } from "react-i18next";
import { I18nLanguageProvider } from "./store/I18nLanguageContext.jsx";

// react-snap's headless Chromium may lack Intl.Segmenter (also affects very old browsers).
if (typeof Intl !== "undefined" && typeof Intl.Segmenter !== "function") {
  Intl.Segmenter = class {
    constructor() {}
    segment(input) {
      const str = String(input ?? "");
      const segments = [];
      for (let i = 0; i < str.length; i++) {
        segments.push({ segment: str[i], index: i, input: str });
      }
      return {
        containing(idx) {
          const i = Math.min(Math.max(Number(idx) || 0, 0), Math.max(0, segments.length - 1));
          return segments[i] ?? { segment: "", index: 0, input: str };
        },
        [Symbol.iterator]() {
          let i = 0;
          return {
            next() {
              if (i < segments.length) return { value: segments[i++], done: false };
              return { done: true };
            },
          };
        },
      };
    }
  };
}

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

function mountApp(App) {
  const app = (
    <BrowserRouter>
      <I18nLanguageProvider>
        <App />
      </I18nLanguageProvider>
    </BrowserRouter>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
}

async function bootstrap() {
  try {
    await initI18n();
  } catch (err) {
    console.error("initI18n failed", err);
    if (!i18n.isInitialized) {
      await i18n.use(initReactI18next).init({
        lng: "en",
        fallbackLng: "en",
        resources: { en: { translation: {} } },
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });
    }
  }
  const { default: App } = await import("./App.jsx");
  mountApp(App);
}

bootstrap();