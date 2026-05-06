import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18n, { ensureLanguageLoaded } from "../locales/i18n";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  swapLocaleInPathname,
  withLocalePrefix,
} from "../utils/localePaths";

const LOCALE_COOKIE_NAME = "preferred_locale";

function persistPreferredLocaleCookie(lang) {
  if (typeof document === "undefined") return;
  if (!["en", "fr", "ar"].includes(lang)) return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE_NAME}=${lang}; Max-Age=${oneYear}; Path=/; SameSite=Lax`;
}

const I18nLanguageContext = createContext({
  language: DEFAULT_LOCALE,
  isRtl: false,
  setLanguage: () => {},
  localizedPath: (path) => path,
  localizedNavigate: () => {},
});

export function I18nLanguageProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      const loc = getLocaleFromPathname(window.location.pathname);
      if (loc) return loc;
    }
    return i18n.resolvedLanguage || i18n.language || DEFAULT_LOCALE;
  });

  useEffect(() => {
    const loc = getLocaleFromPathname(location.pathname);
    if (!loc || loc === language) return;

    let cancelled = false;
    (async () => {
      await ensureLanguageLoaded(loc);
      if (cancelled) return;
      setLanguageState(loc);
      if (i18n.language !== loc) {
        await i18n.changeLanguage(loc);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, language]);

  useEffect(() => {
    const html = document.documentElement;
    if (language === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      html.classList.add("font-cairo");
      html.classList.remove("font-hero-light");
    } else if (language === "fr") {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "fr");
      html.classList.add("font-hero-light");
      html.classList.remove("font-cairo");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      html.classList.add("font-hero-light");
      html.classList.remove("font-cairo");
    }
  }, [language]);

  useEffect(() => {
    persistPreferredLocaleCookie(language);
  }, [language]);

  const localizedPath = useCallback(
    (path) => {
      if (path == null || typeof path !== "string") return path;
      if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
      if (/^\/(en|fr|ar)(\/|$)/.test(path)) return path;
      const normalized = path.startsWith("/") ? path : `/${path}`;
      const rest = normalized === "/" ? "/" : normalized;
      return withLocalePrefix(language, rest);
    },
    [language]
  );

  const localizedNavigate = useCallback(
    (to, options) => {
      if (typeof to === "number") {
        navigate(to);
        return;
      }
      if (typeof to === "string") {
        navigate(localizedPath(to), options);
        return;
      }
      navigate(to, options);
    },
    [navigate, localizedPath]
  );

  const setLanguage = useCallback(
    async (lang) => {
      if (lang !== "en" && lang !== "fr" && lang !== "ar") return;
      await ensureLanguageLoaded(lang);

      const newPathname = swapLocaleInPathname(location.pathname, lang);
      const params = new URLSearchParams(location.search);
      params.delete("lang");
      const search = params.toString() ? `?${params.toString()}` : "";

      setLanguageState(lang);
      persistPreferredLocaleCookie(lang);
      if (i18n.language !== lang) {
        await i18n.changeLanguage(lang);
      }

      navigate(
        {
          pathname: newPathname,
          search,
          hash: location.hash,
        },
        { replace: true }
      );
    },
    [location.hash, location.pathname, location.search, navigate]
  );

  const isRtl = language === "ar";

  const value = useMemo(
    () => ({
      language,
      isRtl,
      setLanguage,
      localizedPath,
      localizedNavigate,
    }),
    [language, isRtl, setLanguage, localizedPath, localizedNavigate]
  );

  return (
    <I18nLanguageContext.Provider value={value}>
      {children}
    </I18nLanguageContext.Provider>
  );
}

export function useI18nLanguage() {
  return useContext(I18nLanguageContext);
}
