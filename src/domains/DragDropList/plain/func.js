//----------------------------------
//  Utility
//----------------------------------
function isOverIconArea(event) {
    const gutters = [[0, 0], [0, 15], [0, -15], [20, 0], [20, 15], [20, -15]];
    for (let i = 0; i < gutters.length; i++) {
        const element = document.elementFromPoint(event.pageX + gutters[i][0], event.pageY + gutters[i][1]);
        if (element.tagName === "IMG") {
            return true;
        }
    }
    return false;
}


//----------------------------------
//  Slot Functions
//----------------------------------
function getSlot(event) {
    return (event && event.target.id === 'slot' &&  event.target) || document.getElementById("slot");
}

function createSlot(isLast = false) {
    const slot = document.createElement("img");
    slot.setAttribute("id", "slot");
    slot.setAttribute("class", "slot");
    slot.setAttribute("isLast", isLast.toString());
    slot.addEventListener("drop", slotDrop);
    slot.addEventListener("transitionend", slotTransitionEnd);
    return slot;
}

function addSlotRemoveStyle(slot) {
    slot = slot || getSlot();
    slot && slot.classList.add("slot-hide");
}

function removeSlot(event) {
    const slot = getSlot(event);
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
    listA.replaceChild(icon, target);
}


//----------------------------------
//  Icon Functions
//----------------------------------
function iconMoveBack(event) {
    const element = event.target;
    if (element.parentElement.id === "list_a") {
        const listB = document.getElementById("list_b");
        element.setAttribute("location", undefined);
        listB.appendChild(element);
    }
}

function iconDragStart (event) {
    event.dataTransfer.setData("text", event.target.id);
    setTimeout(function(){
        event.target.classList.add('block-hide');
    },0);
}

function iconDragEnter(event) {
    event.preventDefault();
    const target = event.target;
    const listA = getListA();
    if (target.parentElement.id === 'list_a') {
        addSlotRemoveStyle();
        const slot = getSlot();
        if (!slot || slot.nextSibling !== target) {
            const slot = createSlot();
            listA.insertBefore(slot, target);
        }
    }
}

function iconDragEnd(event) {
    event.target.classList.remove('block-hide');
    addSlotRemoveStyle();
}


//----------------------------------
//  List Functions
//----------------------------------
function getListA() {
    return document.getElementById("list_a");
}

function listDragOver (event) {
    event.preventDefault();
    const isOverIcons = isOverIconArea(event);
    const slot = getSlot();
    if (slot && slot.getAttribute("isLast") === "false" && !isOverIcons) {
        addSlotRemoveStyle();
    }
    if (!getSlot() && !isOverIcons) {
        const listA = getListA();
        const slot = createSlot(true);
        listA.appendChild(slot);
    }
}

function listDragLeave(event) {
    const element = document.elementFromPoint(event.pageX, event.pageY);
    if (!element || (element.id !== "list_a" && (!element.parentElement || element.parentElement.id !== "list_a"))) {
        addSlotRemoveStyle();
    }
}


//----------------------------------
//  Load Event Handlers
//----------------------------------
window.onload = function () {
    const list = document.getElementById('list_a');
    list.addEventListener("dragover", listDragOver);
    list.addEventListener("dragleave", listDragLeave);

    const icons = document.getElementsByClassName('icon');
    Array.from(icons).forEach(icon => {
        icon.addEventListener("dragstart", iconDragStart);
        icon.addEventListener("click", iconMoveBack);
        icon.addEventListener("dragenter", iconDragEnter);
        icon.addEventListener("dragend", iconDragEnd);
    });
}