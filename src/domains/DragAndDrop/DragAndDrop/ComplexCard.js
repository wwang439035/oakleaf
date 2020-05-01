import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./ComplexCard.module.sass"
import CardDropZone from "./CardDropZone";

export default class ComplexCard extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        index: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        items: PropTypes.object,
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
        const {value, items} = this.props;
        let valueFields = [
            <div className={styles.item}
                 key={"value"}>{`Num of Values: ${Array.isArray(value) ? value.length : 0}`}
            </div>
        ];
        valueFields.push((items || []).map((item, index) => (
            <div className={styles.item} key={item.id}>
                {`${item.name}: ${item.value}`}
            </div>
        )));
        return valueFields;
    }

    render() {
        const {isLast} = this.props;
        return (
            <div className={classNames({[styles.container]: true, [styles.lastCard]: isLast})}>
                {this.renderName()}
                {this.renderBody()}
                <CardDropZone className={styles.cardDropZone}/>
            </div>
        )
    }
}