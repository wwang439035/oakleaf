import React, {Component} from "react";
import {connect} from 'react-redux';
import {DragSource, DropTarget} from "react-dnd";
import classNames from "classnames";
import PropTypes from "prop-types";
import {CARD_TYPES} from "../../constants";
import styles from "./Card.module.sass"
import {
    addToCardContainer,
    addToCardDropZone,
    removeCardFromContainer,
    removeCardOrContainer,
    reorderCardsOrContainers
} from "../actions";
import {buildAdvancedCard, buildInContainerCard} from "../utils";

class Card extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        containerId: PropTypes.string,
        containerIndex: PropTypes.number,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        dispatch: PropTypes.func,
        connectDragSource: PropTypes.func,
        connectDropTarget: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    renderName = function () {
        const {name, type, index} = this.props;
        let parsedIndex = index + 1;
        if (type === CARD_TYPES.IN_CONTAINER) {
            parsedIndex = String.fromCharCode(index + 97);
        }
        return (
            <div className={styles.nameBar}>
                {`${parsedIndex}.  ${name}`}
            </div>
        )
    }

    renderBody = function () {
        const {value} = this.props;
        return (
            <div className={styles.item}
                 key={"value"}>{`Num of Values: ${Array.isArray(value) ? value.length : 0}`}
            </div>
        );
    }

    handleClick = function (event) {
        const {
            index,
            containerId,
            containerIndex,
            dispatch
        } = this.props;
        if (containerId) {
            event.stopPropagation();
            dispatch(removeCardFromContainer(containerIndex, index));
        } else {
            dispatch(removeCardOrContainer(index));
        }
    }

    renderDraggableCard = function () {
        const {type, connectDragSource} = this.props;
        return connectDragSource(
            <div ref={this.ref} className={classNames({
                [styles.container]: type === CARD_TYPES.BASIC,
                [styles.inContainer]: type === CARD_TYPES.IN_CONTAINER
            })}
                 onClick={this.handleClick.bind(this)}
            >
                {this.renderName()}
                {this.renderBody()}
            </div>
        )
    }

    render() {
        const {type, connectDropTarget} = this.props;
        return connectDropTarget(
            <div>
                <div className={classNames({
                    [styles.topContainerGutter]: type !== CARD_TYPES.IN_CONTAINER,
                    [styles.topInContainerGutter]: type === CARD_TYPES.IN_CONTAINER
                })}/>
                {this.renderDraggableCard()}
            </div>
        )
    }
}

const dragSpec = {
    beginDrag(props, monitor, component) {
        const item = props;
        console.log(props);
        return item;
    }
};

const dropSpec = {
    drop(props, monitor, component) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
            return;
        }

        let movedCard = Object.assign({}, monitor.getItem());
        if (((movedCard.containerIndex !== undefined && movedCard.containerIndex === props.containerIndex)
            || (movedCard.containerIndex === undefined && props.containerIndex === undefined))
            && movedCard.index !== undefined && props.index !== undefined && movedCard.index !== props.index) {
            props.dispatch(reorderCardsOrContainers(movedCard.index, props.index, props.containerIndex));
        } else if (movedCard.index === undefined && props.index !== undefined) {
            if (props.type === CARD_TYPES.IN_CONTAINER && movedCard.type === CARD_TYPES.ADVANCED) {
                buildInContainerCard(movedCard, props.id)
                props.dispatch(addToCardContainer(props.containerIndex, movedCard, props.index));
            } else if (props.type !== CARD_TYPES.IN_CONTAINER) {
                if (movedCard.type === CARD_TYPES.ADVANCED) {
                    buildAdvancedCard(movedCard);
                }
                props.dispatch(addToCardDropZone(movedCard, props.index));
            }
        }
    }
};

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
};

export default function (type) {
    return connect()(
        DropTarget(
            [CARD_TYPES.BASIC, CARD_TYPES.ADVANCED, CARD_TYPES.IN_CONTAINER],
            dropSpec,
            dropCollect)(
            DragSource(type, dragSpec, dragCollect)(Card)
        )
    );
}