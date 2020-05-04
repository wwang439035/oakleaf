import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {DragSource} from "react-dnd";
import {Map} from "immutable";
import styles from "./CardContainer.module.sass"
import cardDropZoneFactory from "./CardDropZone";
import {CARD_TYPES} from "../../constants";
import {removeCardOrContainer} from "../actions";

const mapStateToProps = (state, {id}) => ({
    children: (state.getIn(['DragAndDrop', 'cards', id, 'children']) || Map()).toJS()
})

class CardContainer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        fields: PropTypes.array,
        children: PropTypes.object,
        dispatch: PropTypes.func,
        connectDragSource: PropTypes.func
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {id, children, dispatch} = this.props;
        if (Object.keys(children).length > 0 && Object.keys(nextProps.children).length === 0) {
            dispatch(removeCardOrContainer(id));
        }
    }

    renderHeader = function () {
        const {index} = this.props;
        return (
            <div className={styles.nameBar}>
                {`${index}.  Advanced Card`}
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
        const {id, connectDragSource} = this.props;
        const CardDropZone = cardDropZoneFactory('cardContainer');
        return connectDragSource(
            <div className={styles.container}>
                {this.renderHeader()}
                {this.renderFields()}
                <CardDropZone className={styles.cardDropZone} id={id}/>
            </div>
        )
    }
}

const spec = {
    beginDrag(props, monitor, component) {
        return undefined;
    },

    endDrag(props, monitor, component) {
        const item = monitor.getItem();
        console.log(item);
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

export default connect(mapStateToProps)(DragSource(CARD_TYPES.ADVANCED, spec, collect)(CardContainer));