import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationAR from './ar/translation.json';
import translationFR from './fr/translation.json';


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ar: { translation: translationAR },
    fr: { translation: translationFR },
  },

lng: (() => {
    try {
      return localStorage.getItem("language") || "en";
    } catch {
      return "en";
    }
  })(),
  fallbackLng: (() => {
    try {
      return localStorage.getItem("language") || "en";
    } catch {
      return "en";
    }
  })(),
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
