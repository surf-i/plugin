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
  
async function isBlacklisted(url) {
    //let blacklist = await chrome.runtime.sendMessage({ msg: "getBlacklist" });
    let blacklist = ["https://www.google.com", "https://twitter.com", "https://facebook.com", "https://bloqueneon.uniandes.edu.co", 
                "https://www.youtube.com", "https://www.instagram.com", "https://www.amazon.com", "https://www.netflix.com", "https://www.reddit.com",
                "https://www.linkedin.com", "https://www.pinterest.com", "https://www.quora.com", "https://www.canva.com", "https://www.flickr.com",
                "https://www.tumblr.com", "https://discord.com", "https://www.twitch.tv"]
    return blacklist.includes(url)
}

async function getFormattedUrl(url)
{
    let documento = document.createElement('a')
    if (url.charAt(url.length - 1)=='/')
    {
        url = url.substring(0,url.length-1)
    }
    documento.href = url
    let host =  "https://"+documento.hostname
    if (await isBlacklisted(host))
    {
        return decodeURI(host)
    }
    else
    {
        return decodeURI(url)
    }
}


export {addElement, deleteElement, StringHTML, isBlacklisted, getFormattedUrl}//export all functions



