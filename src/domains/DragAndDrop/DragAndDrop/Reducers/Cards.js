import {fromJS, Map} from 'immutable';

const initialState = Map();

export default function cards(state = initialState, action) {
    switch (action.type) {
        case 'addToCardDropZone':
            return addToCardDropZone(state, action);
        case 'addToCardContainer':
            return addToCardContainer(state, action);
        case 'removeCardOrContainer':
            return removeCardOrContainer(state, action);
        case 'removeCardFromContainer':
            return removeCardFromContainer(state, action);
        default:
            return state;
    }
}

const addToCardDropZone = function (state, {card}) {
    return state.set(card.id, fromJS(card));
}

const addToCardContainer = function (state, {id, card}) {
    return state.setIn([id, 'children', card.id], fromJS(card));
}

const removeCardOrContainer = function (state, {id}) {
    return state.delete(id);
}

const removeCardFromContainer = function (state, {containerId, cardId}) {
    return state.deleteIn([containerId, 'children', cardId]);
}