// this is a ligth vanilla javascript framwork based on components paradigm

//Parse from String to HTML
function StringHTML(string) {
    const div = document.createElement('div');
    string = string.replace(/\>/g, ">")
    div.innerHTML = string;
    return div.children[0];
}

function addElement(object, template, place){
    const string = template(object)
    const element = StringHTML(string);
    place.insertBefore(element, place.firstChild)
}


function eventHandler(object){
    return true
}

function killEvents(arr){

}

function deleteElement(element){
    killEvents(null)
    element.remove()
}

//Dev

async function getHTML(url) {
    let response = await fetch(url);
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`);}
    let text = await response.text(); // await ensures variable has fulfilled Promise
    return text
}
  

export {addElement, deleteElement}//export all functions



