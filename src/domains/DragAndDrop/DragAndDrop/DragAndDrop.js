import React, {Component} from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardList from "./Components/CardList";
import cardDropZoneFactory from "./Components/CardDropZone";
import {cardItems} from "../constants";
import styles from './DragAndDrop.module.sass'

class DragAndDrop extends Component {
    render() {
        const CardDropZone = cardDropZoneFactory('dropZone');
        return (
            <div>
                <h2>Drag and Drop Component with React-DND</h2>
                <br/>
                <div className={styles.dashboard}>
                    <CardDropZone useEmpty={true} />
                    <CardList items={cardItems}/>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DragAndDrop);