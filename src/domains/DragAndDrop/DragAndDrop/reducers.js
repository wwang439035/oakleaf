import { combineReducers } from 'redux-immutable';
import cards from "./Reducers/Cards";

export default combineReducers({
    cards: cards
})