import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import en from './en';
import tr from './tr';

const ASYNC_STORAGE_KEY = 'userLanguage';

const LANGUAGES = {
  tr,
  en,
};

const LANGUAGE_CODE = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY, (err, language) => {
      if (err || !language) {
        if (err) {
          console.log('Dil yüklenirken hata oluştu.');
        } else {
          AsyncStorage.setItem(ASYNC_STORAGE_KEY, 'tr').then(() => {
            console.log('Dil setlemediniz. dil seçiniz.');
          });
        }

        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANGUAGE_CODE);

        callback(findBestAvailableLanguage?.languageTag || 'tr');

        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, language);
  },
};

export default i18n
  .use(intervalPlural)
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });
