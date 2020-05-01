import React from "react";
import PropTypes from "prop-types";
import PlainDragAndDrop from "./PlainDragAndDrop/PlainDragAndDrop";
import DragAndDrop from "./DragAndDrop/DragAndDrop";

const PLAIN_DRAG_AND_DROP = "PlainDragAndDrop";
const REACT_DRAG_AND_DROP = "ReactDragAndDrop";

const DndFactory = props => {
    switch (props.type) {
        case PLAIN_DRAG_AND_DROP:
            return <PlainDragAndDrop { ...props }/>;
        case REACT_DRAG_AND_DROP:
            return <DragAndDrop { ...props } />;
        default:
            return null;
    }
};

DndFactory.prototype = {
    type: PropTypes.oneOf([PLAIN_DRAG_AND_DROP, REACT_DRAG_AND_DROP]).isRequired
}

export default DndFactory;