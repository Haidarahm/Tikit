import i18n from "i18next";
import { initReactI18next } from "react-i18next";

function readStoredLanguage() {
  try {
    const v = localStorage.getItem("language");
    if (v === "en" || v === "ar" || v === "fr") return v;
    return "en";
  } catch {
    return "en";
  }
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

/**
 * Loads only the active locale (+ English when not English, for fallbackLng).
 * Keeps unused translation JSON out of the initial JS chunk vs static imports of all languages.
 */
export async function initI18n() {
  const lng = readStoredLanguage();

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
