import { createSelector } from 'reselect'; 

const getCards = () => (state) => state.cards.toJS(); 

const allCardsSelector = createSelector(
    getCards(), 
    (cards) => {
        if(cards.toJS) return cards.toJS(); 
        else return cards; 
    }
);

export {
    allCardsSelector
}