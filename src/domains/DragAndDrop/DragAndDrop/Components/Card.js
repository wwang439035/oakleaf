import React, {Component} from "react";
import {connect} from 'react-redux';
import {DragSource} from "react-dnd";
import classNames from "classnames";
import PropTypes from "prop-types";
import {CARD_TYPES} from "../../constants";
import styles from "./Card.module.sass"
import {removeCardFromContainer, removeCardOrContainer} from "../actions";

class Card extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        containerId: PropTypes.string,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        dispatch: PropTypes.func,
        connectDragSource: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    renderName = function () {
        const {name, type, index} = this.props;
        let parsedIndex = index;
        if (type === CARD_TYPES.IN_CONTAINER) {
            parsedIndex = String.fromCharCode(index + 96);
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

    handleClick = function() {
        const { id, containerId, dispatch } = this.props;
        if (containerId) {
            dispatch(removeCardFromContainer(containerId, id));
        } else {
            dispatch(removeCardOrContainer(id));
        }
    }

    render() {
        const {type, connectDragSource} = this.props;
        return connectDragSource(
            <div ref={this.ref} className={classNames({
                [styles.container]: type === CARD_TYPES.BASIC,
                [styles.inContainer]: type === CARD_TYPES.IN_CONTAINER
            })}
                 onClick={() => this.handleClick()}
            >
                {this.renderName()}
                {this.renderBody()}
            </div>
        )
    }
}

const spec = {
    beginDrag(props, monitor, component) {
        const item = props;
        console.log(props);
        return item;
    },

    isDragging(props, monitor, component) {

    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
};

export default connect()(DragSource(CARD_TYPES.BASIC, spec, collect)(Card));