export const addToCardDropZone = (card, index) => ({
    type: 'addToCardDropZone',
    card,
    index
})

export const addToCardContainer = (containerIndex, card, index) => ({
    type: 'addToCardContainer',
    containerIndex,
    card,
    index
})

export const removeCardOrContainer = index => ({
    type: 'removeCardOrContainer',
    index
})

export const removeCardFromContainer = (containerIndex, index) => ({
    type: 'removeCardFromContainer',
    containerIndex,
    index
})

export const reorderCardsOrContainers = (preIndex, newIndex, containerIndex) => ({
    type: 'reorderCardsOrContainers',
    preIndex,
    newIndex,
    containerIndex
})