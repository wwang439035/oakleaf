import ReactDOM from 'react-dom';
import styles from './DragAndDrop.module.css';

//----------------------------------
//  Slot Functions
//----------------------------------
function getSlot(isCurrent = true) {
    const className = isCurrent ? styles.slot : styles.slotHide;
    return ReactDOM.findDOMNode(document.getElementById("list_a")).getElementsByClassName(className)[0];
}

function createSlot(iconId, isLast = false) {
    const slot = document.createElement("img");
    slot.setAttribute("class", styles.slot);
    slot.setAttribute("iconId", iconId);
    slot.setAttribute("isLast", isLast.toString());
    slot.addEventListener("drop", slotDrop);
    slot.addEventListener("transitionend", slotTransitionEnd);
    getMessage(slot);
    return slot;
}

function getMessage(slot) {
    return JSON.stringify({
        class: slot.className,
        iconId: slot.getAttribute("iconId"),
        isLast: slot.getAttribute("isLast")
    });
}

function addSlotRemoveStyle(slot) {
    slot = slot || getSlot();
    slot && slot.classList.replace(styles.slot, styles.slotHide);
}

function removeSlot(event) {
    const slot = event.target;
    if (slot) {
        slot.remove();
    }
}

function slotTransitionEnd(event) {
    if (event.target.width === 0) {
        removeSlot(event);
    }
}

function slotDrop(event) {
    event.preventDefault();
    const target = event.target;
    const listA = getListA();
    const elementId = event.dataTransfer.getData("text");
    event.dataTransfer.clearData("text");
    const icon = document.getElementById(elementId);
    icon.setAttribute("location", "list_a");
    icon.classList.remove('block-hide');
    listA.insertBefore(icon, target);
    setTimeout(function () {
        listA.removeChild(target);
    }, 0);
}


//----------------------------------
//  Icon Functions
//----------------------------------
export function iconMoveBack(event) {
    const element = event.target;
    if (element.parentElement.id === "list_a") {
        const listB = document.getElementById("list_b");
        element.setAttribute("location", undefined);
        listB.appendChild(element);
    }
}

export function iconDragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    const target = event.target;
    setTimeout(function () {
        target.classList.add(styles.blockHide);
    }, 0);
}

export function iconDragEnter(event) {
    event.preventDefault();
    const target = event.target;
    const listA = getListA();
    const currentSlot = getSlot();
    if (target.parentElement.id === 'list_a') {
        if (currentSlot && currentSlot.getAttribute("iconId") === target.id) {
            return;
        }
        if (currentSlot) {
            addSlotRemoveStyle(currentSlot);
        }
        const slot = createSlot(target.id);
        listA.insertBefore(slot, target);
    }
}

export function iconDragEnd(event) {
    event.target.classList.remove(styles.blockHide);
    addSlotRemoveStyle();
}


//----------------------------------
//  List Functions
//----------------------------------
function getListA() {
    return document.getElementById("list_a");
}

function isOverIconArea(event) {
    const gutters = [[0, 0], [0, 20], [0, -20], [20, 0], [20, 20], [20, -20]];
    for (let i = 0; i < gutters.length; i++) {
        const element = document.elementFromPoint(event.pageX + gutters[i][0], event.pageY + gutters[i][1]);
        if (element.tagName === "IMG") {
            return true;
        }
    }
    return false;
}

export function listDragOver(event) {
    event.preventDefault();
    const isOverIcons = isOverIconArea(event);
    const currentSlot = getSlot();
    if (currentSlot && currentSlot.getAttribute("isLast") === "false" && !isOverIcons) {
        addSlotRemoveStyle();
    }
    if (!currentSlot && !isOverIcons) {
        const listA = getListA();
        const slot = createSlot("", true);
        listA.appendChild(slot);
    }
}

export function listDragLeave(event) {
    const element = document.elementFromPoint(event.pageX, event.pageY);
    if (!element || (element.id !== "list_a" && (!element.parentElement || element.parentElement.id !== "list_a"))) {
        addSlotRemoveStyle();
    }
}