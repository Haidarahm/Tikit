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

  lng: localStorage.getItem("language") || "en",
  fallbackLng: localStorage.getItem("language") || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
