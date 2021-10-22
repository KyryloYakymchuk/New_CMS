import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from '@utils/constants/Languages/En/translationEn';
import { ru } from '@utils/constants/Languages/Ru/translationRu';
import { ua } from '@utils/constants/Languages/Uk/translationUk';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: en
            },
            ru: {
                translations: ru
            },
            ua: {
                translations: ua
            }
        },
        fallbackLng: 'en',
        debug: false,

        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        },

        react: {
            wait: true
        }
    });

export default i18n;
