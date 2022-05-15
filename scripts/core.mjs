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
  
 function isBlacklisted(url) {
    let blacklist = chrome.storage.local.get(['blacklist'], function(result) {
        return result.blacklist.includes(url)
      });
    return blacklist
}

function getFormattedUrl(url)
{
    let documento = document.createElement('a')
    documento.href = url
    let host =  "https://"+documento.hostname
    if (isBlacklisted(host))
    {
        return decodeURI(host)
    }
    else
    {
        return decodeURI(url)
    }
}


export {addElement, deleteElement, StringHTML, isBlacklisted, getFormattedUrl}//export all functions



