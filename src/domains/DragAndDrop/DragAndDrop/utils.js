import {CARD_TYPES} from "../constants";

export const buildAdvancedCard = function (cardMetaData) {
    const containerId = `sl_${cardMetaData.id}`;
    const childCard = Object.assign({}, cardMetaData);
    childCard.type = CARD_TYPES.IN_CONTAINER;
    childCard.containerId = containerId;
    cardMetaData.id = containerId;
    cardMetaData.children = [childCard];
}

export const buildInContainerCard = function (cardMetaData, containerId) {
    cardMetaData.type = CARD_TYPES.IN_CONTAINER;
    cardMetaData.containerId = containerId;
}