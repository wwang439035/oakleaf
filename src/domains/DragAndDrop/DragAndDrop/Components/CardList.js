import React, {Component} from "react";
import {DragSource} from "react-dnd";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./CardList.module.sass"
import {CARD_TYPES} from "../../constants";

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        items: PropTypes.array
    }

    renderItems = function () {
        const {items} = this.props;
        return (items || []).map((item) => {
            const CardItem = CardListItem(item.type);
            return <CardItem key={item.id} {...item}/>
        });
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderItems()}
            </div>
        )
    }
}

const spec = {
    beginDrag(props, monitor, component) {
        const item = props;
        return item;
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
};

const CardListItem = type => DragSource(type, spec, collect)(class extends Component {
    static propTypes = {
        name: PropTypes.string,
        key: PropTypes.string,
        type: PropTypes.string,
        connectDragSource: PropTypes.func
    }

    render() {
        const {
            connectDragSource,
            name,
            key,
            type
        } = this.props;
        return connectDragSource(
            <div className={classNames({
                [styles.basicCardItem]: type === CARD_TYPES.BASIC,
                [styles.advancedCardItem]: type === CARD_TYPES.ADVANCED
            })}
                 key={key}
            >
                <div className={styles.cardItemName}>
                    {name}
                </div>
                <div className={styles.cardItemBody}>
                    {`Type: ${type}`}
                </div>
            </div>
        );
    }
});

