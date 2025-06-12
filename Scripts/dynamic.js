/* *User Defined Functions to make coding easier and write shorter codes* */

/*Function to create new element and append it to the given parent element*/
// elementParent is the html element or its id or class name
// elementType is the type of the element: e.g. div, input, button, etc.
// className is the class name to be set for the new element

export function createDElement(elementParent,elementType,className){
    const parentE = document.querySelector(elementParent);
    const newElem = document.createElement(elementType);
    newElem.setAttribute("class",className);
    parentE.appendChild(newElem);
}

/*Function to just create an element and not attach it on the document*/
export function justCreateElement(elementType,className){
    const newElem = document.createElement(elementType);
    newElem.setAttribute("class",className);
}

/*Function to add text node to an element*/
export function addText(elementParent, string){
    const parentE = document.querySelector(elementParent);
    const t = document.createTextNode(string);
    parentE.appendChild(t);
}

/*Function to remove existing text in an element*/
export function removeText(e){
    document.querySelector(e).textContent = "";
}

/*Function to remove an existing element*/
export function removeDElement(e){
    document.querySelector(e).remove();
}

/*Function to change the css of an element*/
export function changeCSS(e, prop, val) {
    document.querySelector(e).style[prop] = val;
}

/*Function to return true/false acc to the css of an element*/
export function isCSS(e,prop, val){
    if(val == document.querySelector(e).style[prop]){
        return true;
    }
    else{
        return false;
    }
}

/*Function that removes many elements at once*/
export function removeElements(arr){
    arr.forEach(e => document.querySelector(e).remove());
}