import React, {Component, Fragment} from "react";
import classNames from 'classnames';
import {
    iconMoveBack,
    iconDragStart,
    iconDragEnter,
    iconDragEnd,
    listDragLeave,
    listDragOver,
} from './EventHandlers';
import styles from './PlainDragAndDrop.module.css';

const ICON_DIR = '../images';

export default class PlainDragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [
                `${ICON_DIR}/01.png`,
                `${ICON_DIR}/02.png`,
                `${ICON_DIR}/03.png`,
                `${ICON_DIR}/04.png`,
            ]
        };
        this.myRef = React.createRef();
    }

    renderIcons = function () {
        const { icons } = this.state;
        return icons.map((icon, index) => (
            <img
                id={ `icon${index}` }
                key={ `icon${index}` }
                className= { styles.icon }
                src={ icon }
                draggable={ true }
                alt={ `icon ${index}` }
                onDragStart={ iconDragStart }
                onClick={ iconMoveBack }
                onDragEnter={ iconDragEnter }
                onDragEnd={ iconDragEnd }
            />
        ));
    }

    render() {
        return (
            <Fragment>
                <h2 className="middle">Drag and Drop Component with Plain JS</h2>
                <br/>
                <div className={ styles.panel }>
                    <h3>Drop To</h3>
                    <div id="list_a"
                         className={ `${styles.listSize} ${styles.listA}` }
                         onDragOver={ listDragOver }
                         onDragLeave={ listDragLeave }
                    />
                    <br/>
                    <h3>Drag From</h3>
                    <div id="list_b" className={ classNames({[styles.listSize]: true, [styles.listB]: true }) }>
                        { this.renderIcons() }
                    </div>
                </div>
            </Fragment>
        );
    }
}
