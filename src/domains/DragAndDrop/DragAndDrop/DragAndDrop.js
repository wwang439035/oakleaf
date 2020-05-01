import React, {Component} from "react";
import CardList from "./CardList";
import CardDropZone from "./CardDropZone";
import {cardItems} from "../constants";
import styles from './DragAndDrop.module.sass'

export default class DragAndDrop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Drag and Drop Component with React-DND</h2>
                <br/>
                <div className={styles.dashboard}>
                    <CardDropZone items={cardItems} useEmpty={true} />
                    <CardList items={cardItems}/>
                </div>
            </div>
        );
    }
}