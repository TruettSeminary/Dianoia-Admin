import { createSelector } from 'reselect'; 

import {
    allTranslationsSelector
} from 'collections/translations/selectors'; 

const homePageSelector = () => createSelector(
    [allTranslationsSelector], 
    (translations) => {
        return {
            translations
        }
    }
); 

export {
    homePageSelector
};