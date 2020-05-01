import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Card.module.sass"

export default class Card extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        index: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        isLast: PropTypes.bool
    }

    renderName = function () {
        const {name, index} = this.props;
        return (
            <div className={styles.nameBar}>
                {`${index}.  ${name}`}
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

    render() {
        const {isLast} = this.props;
        return (
            <div className={classNames({[styles.container]: true, [styles.lastCard]: isLast})}>
                {this.renderName()}
                {this.renderBody()}
            </div>
        )
    }
}