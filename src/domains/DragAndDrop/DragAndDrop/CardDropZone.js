import React, {Component} from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import ComplexCard from "./ComplexCard";
import {TYPE_ADVANCED} from "../constants";
import styles from "./CardDropZone.module.sass"

export default class CardDropZone extends Component {
    static propTypes = {
        className: PropTypes.string,
        items: PropTypes.object,
        useEmpty: PropTypes.bool
    }

    static defaultProps = {
        useEmpty: false
    }

    renderEmpty = function () {
        return <div className={styles.empty}>No Cards in Here</div>
    }

    renderItems = function () {
        const {items} = this.props;
        return items.map((item, index) => {
            let CardClass = Card;
            if (item.type === TYPE_ADVANCED) {
                CardClass = ComplexCard;
            }
            return (<CardClass
                id={item.id}
                key={item.id}
                index={index + 1}
                isLast={index === items.length - 1}
                {...item}
            />);
        });
    }

    render() {
        const {
            className,
            items,
            useEmpty
        } = this.props;
        return (
            <div className={className || styles.container}>
                {items && items.length > 0
                    ? this.renderItems()
                    : useEmpty && this.renderEmpty()}
            </div>
        )
    }
}