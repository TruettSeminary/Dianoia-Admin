import userSaga from 'collections/user/saga'; 
import decksSaga from 'collections/decks/saga'; 
import cardsSaga from 'collections/cards/saga'; 
import translationsSaga from 'collections/translations/saga'; 

const sagas = [
    userSaga,
    decksSaga, 
    cardsSaga, 
    translationsSaga
]; 

export {
    sagas
}