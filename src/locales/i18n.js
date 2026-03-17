import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from "./en/sections/common.json";
import enWork from "./en/sections/work.json";
import enInfluencer from "./en/sections/influencer.json";

import arCommon from "./ar/sections/common.json";
import arWork from "./ar/sections/work.json";
import arInfluencer from "./ar/sections/influencer.json";

import frCommon from "./fr/sections/common.json";
import frWork from "./fr/sections/work.json";
import frInfluencer from "./fr/sections/influencer.json";


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...enCommon, ...enWork, ...enInfluencer } },
    ar: { translation: { ...arCommon, ...arWork, ...arInfluencer } },
    fr: { translation: { ...frCommon, ...frWork, ...frInfluencer } },
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
