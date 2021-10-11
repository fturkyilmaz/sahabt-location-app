import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RNLocalize from "react-native-localize"


import en from "./en";
import tr from "./tr";

const ASYNC_STORAGE_KEY = "userLanguage"


const LANGUAGES = {
    en, tr
}

const LANGUAGE_CODE = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
    type: "languageDetector",
    async: true,
    detect: (callback) => {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY, (err, language) => {
            if (err || !language) {
                if (err) {
                    console.log("Dil yüklenirken hata oluştu.")
                } else {
                    console.log("Dil setlemediniz. dil seçiniz.")
                }

                const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(LANGUAGE_CODE);

                callback(findBestAvailableLanguage?.languageTag || "en")

                return;
            }
            callback(language);
        });
    },
    init: () => { },
    cacheUserLanguage: (language) => {
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, language)
    },
};


i18n.use(LANGUAGE_DETECTOR).use(initReactI18next).init({
    resources: LANGUAGES,
    react: {
        useSuspense: false
    },
    interpolation: {
        escapeValue: false
    },
    defaultNS: "common"
});