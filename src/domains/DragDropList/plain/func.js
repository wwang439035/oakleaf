function getListA() {
    return document.getElementById("list_a");
}

function createSlot() {
    const slot = document.createElement("img");
    slot.setAttribute("id", "slot");
    slot.setAttribute("class", "slot");
    slot.addEventListener("dragleave", slotDragLeave);
    slot.addEventListener("drop", slotDrop);
    return slot;
}

function getSlot() {
    return document.getElementById("slot");
}

function removeSlot() {
    if (document.getElementById('slot')) {
        document.getElementById('slot').remove();
    }
}

function dragStart (event) {
    event.dataTransfer.setData("text", event.target.id);
    setTimeout(function(){
        event.target.classList.add('block-hide');
    },0);
}

function listDragOver (event) {
    event.preventDefault();
    if (!document.getElementById('slot')) {
        const listA = getListA();
        const slot = createSlot();
        listA.appendChild(slot);
    }
}

function slotDragLeave(event) {
    event.target.remove();
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
    const listA = getListA();
    const target = event.target;
    if (target.parentElement.id === 'list_a') {
        removeSlot();
        const slot = createSlot();
        listA.insertBefore(slot, target);
    }
}

function moveBack(event) {
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

    const icons = document.getElementsByClassName('icon');
    Array.from(icons).forEach(icon => {
        icon.addEventListener("dragstart", dragStart);
        icon.addEventListener("click", moveBack);
        icon.addEventListener("dragenter", iconDragEnter);
        icon.addEventListener("dragend", iconDragEnd);
    });
}