import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./BaseComp.module.css";

export default class BaseComp extends Component {
    static propTypes = {
        customStyle: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            States: ['CA', 'NY', 'FL', 'OR', 'MN'],
        }
    }

    getSelfStyles() {
        return styles;
    }

    renderValue() {
        const elements =  this.state.States.map(
            (value, key) => <div
                className={ styles.option }
                key={ key }
            >{ value }</div>
        );
        return elements;
    }

    render() {
        const {
            customStyle
        } = this.props;
        const selfStyles = this.getSelfStyles();
        return (
            <div className={ customStyle || selfStyles.panel }>
                { this.renderValue() }
                <div className={ selfStyles.text }>
                    Hello World!
                </div>
            </div>
        );
    }
}