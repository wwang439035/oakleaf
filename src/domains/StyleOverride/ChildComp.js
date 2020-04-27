import React from "react";
import PropTypes from "prop-types";
import styles from "./ChildComp.module.css";
import BaseComp from "./BaseComp";

export default class ChildComp extends BaseComp {
    static propTypes = {
        customStyle: PropTypes.object
    };

    static defaultProps = {
        customStyle: styles
    };

    getSelfStyles() {
        return styles;
    }

    renderValue() {
        const elements =  this.state.States.map(
            (value, key) => <span
                className={ styles.option }
                key={ key }
            >{ value }, </span>
        );
        return elements
    }
}