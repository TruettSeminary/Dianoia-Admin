import { createSelector } from 'reselect'; 

const getTranslations = () => (state) => state.translations.toJS(); 

const allTranslationsSelector = createSelector(
    getTranslations(), 
    (translations) => {
        if(translations.toJS) return translations.toJS(); 
        else return translations; 
    }
)

export {
    allTranslationsSelector
}