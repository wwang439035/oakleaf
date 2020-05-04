export const addToCardDropZone = card => ({
    type: 'addToCardDropZone',
    card,
})

export const addToCardContainer = (id, card) => ({
    type: 'addToCardContainer',
    id,
    card,
})

export const removeCardOrContainer = id => ({
    type: 'removeCardOrContainer',
    id,
})

export const removeCardFromContainer = (containerId, cardId) => ({
    type: 'removeCardFromContainer',
    containerId,
    cardId
})