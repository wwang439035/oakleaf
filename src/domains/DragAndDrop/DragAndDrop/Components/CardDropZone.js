import React, {Component} from "react";
import {DropTarget} from "react-dnd";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Map} from "immutable";
import Card from "./Card";
import ComplexCard from "./CardContainer";
import {CARD_TYPES} from "../../constants";
import {addToCardContainer, addToCardDropZone} from "../actions";
import styles from "./CardDropZone.module.sass"

const mapStateToProps = (state, {id}) => ({
    children: id ? (state.getIn(['DragAndDrop', 'cards', id, 'children']) || Map()).toJS() : state.getIn(['DragAndDrop', 'cards']).toJS()
})

class CardDropZone extends Component {
    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.object,
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
        const {children} = this.props;
        return Object.values(children).map((child, index) => {
            let CardClass = Card;
            if (child.type === CARD_TYPES.ADVANCED) {
                CardClass = ComplexCard;
            }
            return (<CardClass
                id={child.id}
                key={child.id}
                index={index + 1}
                {...child}
            />);
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

        let card = monitor.getItem();
        if (props.id) {
            if (card.type === CARD_TYPES.ADVANCED) {
                const copyCard = Object.assign({}, card);
                copyCard.type = CARD_TYPES.IN_CONTAINER;
                copyCard.containerId = props.id;
                delete copyCard.fields;
                props.dispatch(addToCardContainer(props.id, copyCard));
            }
        } else if (card.type !== CARD_TYPES.IN_CONTAINER) {
            if (card.type === CARD_TYPES.ADVANCED) {
                const newCard = {};
                newCard.id = Date.now().toString();
                newCard.type = CARD_TYPES.ADVANCED;
                newCard.fields = card.fields;
                const copyCard = Object.assign({}, card);
                copyCard.type = CARD_TYPES.IN_CONTAINER;
                copyCard.containerId = newCard.id;
                delete copyCard.fields;
                newCard.children = {[copyCard.id]: copyCard};
                card = newCard;
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