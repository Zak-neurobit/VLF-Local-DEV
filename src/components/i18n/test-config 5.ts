// Test configuration for i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'error.title': 'Something went wrong',
      'error.description': 'An error occurred while loading this page',
      'error.retry': 'Try again',
    },
  },
  es: {
    translation: {
      'error.title': 'Algo salió mal',
      'error.description': 'Ocurrió un error al cargar esta página',
      'error.retry': 'Intentar de nuevo',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
