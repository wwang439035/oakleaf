import React, {Component} from "react";
import {DropTarget} from "react-dnd";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {List} from "immutable";
import cardFactory from "./Card";
import CardContainer from "./CardContainer";
import {CARD_TYPES} from "../../constants";
import {addToCardContainer, addToCardDropZone, reorderCardsOrContainers} from "../actions";
import styles from "./CardDropZone.module.sass"
import {buildAdvancedCard, buildInContainerCard} from "../utils";

const mapStateToProps = (state, {id, containerIndex}) => ({
    children: id
        ? (state.getIn(['DragAndDrop', 'cards', 'data', containerIndex, 'children']) || List()).toJS()
        : state.getIn(['DragAndDrop', 'cards', 'data']).toJS()
})

class CardDropZone extends Component {
    static propTypes = {
        id: PropTypes.string,
        containerIndex: PropTypes.number,
        className: PropTypes.string,
        children: PropTypes.array,
        useEmpty: PropTypes.bool,
        dispatch: PropTypes.func
    }

    static defaultProps = {
        useEmpty: false,
        children: {}
    }

    renderEmpty() {
        return <div className={styles.empty}>No Cards in Here</div>
    }

    renderChildren() {
        const {id, containerIndex, children} = this.props;
        const Card = cardFactory(id !== undefined ? CARD_TYPES.IN_CONTAINER : CARD_TYPES.BASIC);
        return children.map((child, index) => {
            let CardClass = Card;
            if (child.type === CARD_TYPES.ADVANCED) {
                CardClass = CardContainer;
            }
            return (
                <CardClass
                    id={child.id}
                    key={`${child.id}_${index}`}
                    index={index}
                    containerIndex={containerIndex}
                    {...child}
                />
            );
        });
    }

    render() {
        const {
            connectDropTarget,
            className,
            children,
            useEmpty
        } = this.props;
        return connectDropTarget(
            <div className={className || styles.container}>
                {children && Object.keys(children).length > 0
                    ? this.renderChildren()
                    : useEmpty && this.renderEmpty()}
            </div>
        )
    }
}

let dropZoneType = '';

const spec = {
    drop(props, monitor, component) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
            return;
        }

        let card = Object.assign({}, monitor.getItem());
        if (props.id) {
            if (card.type === CARD_TYPES.ADVANCED) {
                buildInContainerCard(card, props.id);
                props.dispatch(addToCardContainer(props.containerIndex, card));
            }
        } else if (card.type !== CARD_TYPES.IN_CONTAINER) {
            if (card.index !== undefined) {
                props.dispatch(reorderCardsOrContainers(
                    card.index,
                    props.children.length - 1,
                    props.containerIndex)
                );
                return;
            }
            if (card.type === CARD_TYPES.ADVANCED) {
                buildAdvancedCard(card);
            }
            props.dispatch(addToCardDropZone(card));
        }
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

export default type => {
    switch (type) {
        case 'cardContainer':
            dropZoneType = [CARD_TYPES.IN_CONTAINER, CARD_TYPES.ADVANCED];
            break;
        case 'dropZone':
            dropZoneType = [CARD_TYPES.BASIC, CARD_TYPES.ADVANCED];
            break;
        default:
            dropZoneType = 'unknown';
    }
    return connect(mapStateToProps)(
        DropTarget(dropZoneType, spec, collect)(CardDropZone)
    )
}