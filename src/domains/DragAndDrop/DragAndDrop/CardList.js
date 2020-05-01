import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./CardList.module.sass"
import {TYPE_ADVANCED, TYPE_BASIC} from "../constants";

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        items: PropTypes.object
    }

    renderItems = function () {
        const {items} = this.props;
        return (items || []).map((item) => (
            <div className={classNames({
                [styles.basicCardItem]: item.type === TYPE_BASIC,
                [styles.advancedCardItem]: item.type === TYPE_ADVANCED})}
                key={item.id}
                draggable={true}
                >
                <div className={styles.cardItemName}>
            {item.name}
                </div>
                <div className={styles.cardItemBody}>
                {`Type: ${item.type}`}
                </div>
                </div>
                ));
                }

                render() {
                return (
                <div className={styles.container}>
                {this.renderItems()}
                </div>
                )
                }
                }