function getListA() {
    return document.getElementById("list_a");
}

function createSlot(isLast = false) {
    const slot = document.createElement("img");
    slot.setAttribute("id", "slot");
    slot.setAttribute("class", "slot");
    slot.setAttribute("isLast", isLast.toString());
    slot.addEventListener("drop", slotDrop);
    return slot;
}

function getSlot(event) {
    return event && event.target || document.getElementById("slot");
}

function removeSlot(event) {
    const slot = getSlot(event);
    if (slot) {
        slot.remove();
    }
}

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

function iconDragStart (event) {
    event.dataTransfer.setData("text", event.target.id);
    setTimeout(function(){
        event.target.classList.add('block-hide');
    },0);
}

function listDragOver (event) {
    event.preventDefault();
    const isOverIcons = isOverIconArea(event);
    const slot = getSlot();
    if (slot && slot.getAttribute("isLast") === "false" && !isOverIcons) {
        removeSlot();
    }
    if (!getSlot() && !isOverIcons) {
        console.log("listDragOver");
        const listA = getListA();
        const slot = createSlot(true);
        listA.appendChild(slot);
    }
}

function listDragLeave(event) {
    const element = document.elementFromPoint(event.pageX, event.pageY);
    if (element.id !== "list_a" && element.parentElement.id !== "list_a") {
        removeSlot();
    }
}

function iconDragEnd(event) {
    event.target.classList.remove('block-hide');
    removeSlot();
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


function iconDragEnter(event) {
    event.preventDefault();
    const target = event.target;
    const slot = getSlot();
    if (slot && slot.nextSibling && slot.nextSibling.isSameNode(target)) {
        return;
    }
    const listA = getListA();
    if (target.parentElement.id === 'list_a') {
        removeSlot();
        const slot = createSlot();
        listA.insertBefore(slot, target);
    }
}

function iconMoveBack(event) {
    const element = event.target;
    if (element.parentElement.id === "list_a") {
        const listB = document.getElementById("list_b");
        element.setAttribute("location", undefined);
        listB.appendChild(element);
    }
}

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