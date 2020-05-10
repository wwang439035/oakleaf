import {fromJS} from 'immutable';

const initialState = fromJS({
    data: []
});

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
        case 'reorderCardsOrContainers':
            return reorderCardsOrContainers(state, action);
        default:
            return state;
    }
}

const addToCardDropZone = function (state, {card, index}) {
    const data = state.get('data').toJS();
    index = index !== null && index !== undefined ? index : data.length;
    data.splice(index, 0, card);
    return state.set('data', fromJS(data));
}

const addToCardContainer = function (state, {containerIndex, card, index}) {
    console.log(containerIndex);
    const children = state.getIn(['data', containerIndex, 'children']).toJS();
    index = index !== null && index !== undefined ? index : children.length;
    children.splice(index, 0, card)
    return state.setIn(['data', containerIndex, 'children'], fromJS(children));
}

const removeCardOrContainer = function (state, {index}) {
    return state.deleteIn(['data', index]);
}

const removeCardFromContainer = function (state, {containerIndex, index}) {
    return state.deleteIn(['data', containerIndex, 'children', index]);
}

const reorderCardsOrContainers = function (state, {preIndex, newIndex, containerIndex}) {
    let data;
    if (containerIndex !== undefined) {
        data = state.getIn(['data', containerIndex, 'children']).toJS();
    } else {
        data = state.get('data').toJS();
    }
    const moved = data.splice(preIndex, 1)[0];
    data.splice(newIndex, 0, moved);
    if (containerIndex !== undefined) {
        return state.setIn(['data', containerIndex, 'children'], fromJS(data));
    }
    return state.set('data', fromJS(data));
}