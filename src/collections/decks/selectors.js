import { createSelector } from 'reselect'; 

const getDecks = () => (state) => state.decks.toJS();

const allDecksSelector = createSelector(
    getDecks(), 
    (decks) => {
        if(decks.toJS) return decks.toJS(); 
        else return decks; 
    }
)

const allDecksMapSelector = createSelector(
    [allDecksSelector], 
    (decks) => {
        return decks.reduce((mappedDecks, deck) => {
            mappedDecks[deck._id] = deck;
            return mappedDecks; 
        }, {});
    }
)

export {
    allDecksSelector, 
    allDecksMapSelector
}; 