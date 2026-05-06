import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocaleFromPathname } from "../utils/localePaths";

const SUPPORTED_LANGS = new Set(["en", "fr", "ar"]);

function readLanguageFromUrl() {
  if (typeof window === "undefined") return null;
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  return SUPPORTED_LANGS.has(urlLang) ? urlLang : null;
}

function resolveInitialLanguage() {
  if (typeof window !== "undefined") {
    const fromPath = getLocaleFromPathname(window.location.pathname);
    if (fromPath) return fromPath;
  }
  const fromUrl = readLanguageFromUrl();
  if (fromUrl) return fromUrl;
  if (typeof document !== "undefined") {
    const htmlLang = document.documentElement.lang?.toLowerCase?.();
    if (SUPPORTED_LANGS.has(htmlLang)) return htmlLang;
  }
  return "en";
}

function loadLangBundle(lang) {
  if (lang === "ar") {
    return Promise.all([
      import("./ar/sections/common.json"),
      import("./ar/sections/work.json"),
      import("./ar/sections/influencer.json"),
    ]).then(([c, w, inf]) => ({
      ...c.default,
      ...w.default,
      ...inf.default,
    }));
  }
  if (lang === "fr") {
    return Promise.all([
      import("./fr/sections/common.json"),
      import("./fr/sections/work.json"),
      import("./fr/sections/influencer.json"),
    ]).then(([c, w, inf]) => ({
      ...c.default,
      ...w.default,
      ...inf.default,
    }));
  }
  return Promise.all([
    import("./en/sections/common.json"),
    import("./en/sections/work.json"),
    import("./en/sections/influencer.json"),
  ]).then(([c, w, inf]) => ({
    ...c.default,
    ...w.default,
    ...inf.default,
  }));
}

export async function ensureLanguageLoaded(lang) {
  if (!SUPPORTED_LANGS.has(lang)) return;
  if (i18n.hasResourceBundle(lang, "translation")) return;
  const bundle = await loadLangBundle(lang);
  i18n.addResourceBundle(lang, "translation", bundle, true, true);
}

/**
 * Loads only the active locale (+ English when not English, for fallbackLng).
 * Keeps unused translation JSON out of the initial JS chunk vs static imports of all languages.
 */
export async function initI18n() {
  const lng = resolveInitialLanguage();

  let resources;
  if (lng === "en") {
    resources = { en: { translation: await loadLangBundle("en") } };
  } else {
    const [primary, english] = await Promise.all([
      loadLangBundle(lng),
      loadLangBundle("en"),
    ]);
    resources = {
      en: { translation: english },
      [lng]: { translation: primary },
    };
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
