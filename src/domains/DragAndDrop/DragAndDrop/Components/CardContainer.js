import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {List} from "immutable";
import {DragSource, DropTarget} from "react-dnd";
import styles from "./CardContainer.module.sass"
import cardDropZoneFactory from "./CardDropZone";
import {CARD_TYPES} from "../../constants";
import {removeCardOrContainer, reorderCardsOrContainers} from "../actions";

const mapStateToProps = (state, {index}) => ({
    children: (state.getIn(['DragAndDrop', 'cards', 'data', index, 'children']) || List()).toJS()
})

class CardContainer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        fields: PropTypes.array,
        children: PropTypes.array,
        dispatch: PropTypes.func,
        connectDragSource: PropTypes.func
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {index, children, dispatch} = this.props;
        if (children.length > 0 && Object.keys(nextProps.children).length === 0) {
            dispatch(removeCardOrContainer(index));
        }
    }

    handleClick = function () {
        const {index, dispatch} = this.props;
        dispatch(removeCardOrContainer(index));
    }

    renderHeader = function () {
        const {index} = this.props;
        return (
            <div className={styles.nameBar}>
                {`${index + 1}.  Advanced Card`}
            </div>
        )
    }

    renderFields = function () {
        const {value, fields} = this.props;
        let valueFields = [
            <div className={styles.item}
                 key={"value"}>{`Num of Values: ${Array.isArray(value) ? value.length : 0}`}
            </div>
        ];
        valueFields.push((fields || []).map((field, index) => (
            <div className={styles.item} key={field.id}>
                {`${field.name}: ${field.value}`}
            </div>
        )));
        return valueFields;
    }

    render() {
        const {id, index, connectDragSource, connectDropTarget} = this.props;
        const CardDropZone = cardDropZoneFactory('cardContainer');
        return connectDropTarget(
            connectDragSource(
                <div className={styles.container}
                     onClick={() => this.handleClick()}
                >
                    {this.renderHeader()}
                    {this.renderFields()}
                    <CardDropZone className={styles.cardDropZone} id={id} containerIndex={index}/>
                </div>
            )
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

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

const dropSpec = {
    drop(props, monitor, component) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
            return;
        }

        let movedCard = Object.assign({}, monitor.getItem());
        if (movedCard.containerIndex === undefined && props.containerIndex === undefined
            && movedCard.index !== props.index) {
            props.dispatch(reorderCardsOrContainers(movedCard.index, props.index));
            console.log(props);
        }
    }
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
};

export default connect(mapStateToProps)(
    DropTarget(
        [CARD_TYPES.BASIC, CARD_TYPES.ADVANCED],
        dropSpec,
        dropCollect)(
        DragSource(CARD_TYPES.ADVANCED, dragSpec, dragCollect)(CardContainer)
    )
);