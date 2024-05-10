import translationEN from '../locales/en/translation.json'
import translationUZ from '../locales/uz/translation.json'
import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'

const resources = {
    en: {
        translation: translationEN
    },
    uz: {
        translation: translationUZ
    }
}

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;