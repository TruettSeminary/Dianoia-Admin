import { createSelector } from 'reselect'; 

import {
    allDecksSelector
} from 'collections/decks/selectors'; 

import {
    allCardsSelector
} from 'collections/cards/selectors'; 

import {
    allTranslationsSelector
} from 'collections/translations/selectors'; 

const translationPageSelector = () => createSelector(
    [allDecksSelector, allCardsSelector, allTranslationsSelector], 
    (decks, cards, translations) => {
        return {
            decks, 
            cards,
            translations
        }
    }
); 

export {
    translationPageSelector
}