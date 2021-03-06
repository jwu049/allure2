import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import settings from './settings';

export const LANGUAGES = [
    {id: 'en', title: 'English'},
    {id: 'ru', title: 'Русский'},
    {id: 'ptbr', title: 'Português'}
];

LANGUAGES
    .map(lang => lang.id)
    .forEach(lang => addTranslation(lang, require('../translations/' + lang)));

export function initTranslations() {
    return new Promise((resolve, reject) => {
        Object.assign(intervalPlural.options, {
            intervalRegex: /^\((\S*)\)\((.*)\)$/
        });
        i18next.use(intervalPlural).init({
            lng: settings.get('language'),
            interpolation: {
                escapeValue: false
            },
            fallbackLng: 'en'
        }, err => err ? reject(err) : resolve());
    });
}

export function addTranslation(lang, json) {
    i18next.on('initialized', () => {
        i18next.services.resourceStore.addResourceBundle(lang, i18next.options.ns[0], json);
    });
}

export default i18next;
