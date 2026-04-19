import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
/* AOS styles bundled locally (same as npm aos); JS stays lazy in AOSRefresher */
import "aos/dist/aos.css";
import { BrowserRouter } from "react-router-dom";
import i18n, { initI18n } from "./locales/i18n";
import { initReactI18next } from "react-i18next";
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