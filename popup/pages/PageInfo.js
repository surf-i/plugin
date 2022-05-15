const maxTitleLength = 50;
const maxSummaryLength = 300;
let randomValue = getRandomValue();
var url = 'http://44.195.183.116/';

function PageInfoTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">
        <link rel="stylesheet" href="../main/popup.css">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <p id="website-title"></p>
        <div sytle="display: flex; flex-direction: column">
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
        </div>
        <div class="pie-container">
            <div class="pie animate" style="--p:${randomValue};--c: var(--color-E3);">${randomValue}%</div>
            <div class="category">
                <p>Not rated</p>
            </div>
        </div>
        <div class="summary">
            <h3 class="summary_title">Summary</h3>
            <p class="summary_text"></p>
        </div>
    </div>
    `
    )
}
let tabTitle;
let p;
async function loadPageInfo() {
    let pageInfo = await getWebsiteData()
    
    if ("error" in pageInfo){
       try {
        chrome.runtime.sendMessage({ msg: "getCurrentTab" }, function (response) {
        tabTitle = response.title;
        tabTitle = ((tabTitle.length > maxTitleLength) ? tabTitle.substring(0, maxTitleLength) + "..." : tabTitle);
        document.getElementById("website-title").innerHTML = tabTitle;
        });
        
        
        chrome.runtime.sendMessage({ msg: "getWebsiteFirstParagraph" }, function (response) {
            p = response;
            p = (p.includes(undefined)) ? "No summary available" : p;
            p = ((p.length > maxSummaryLength) ? p.substring(0, maxSummaryLength) + "..." : p);
            document.getElementsByClassName("summary_text")[0].innerHTML = p;
        });
        let title = document.getElementById("website-title").innerHTML
        let summary = document.getElementsByClassName("summary_text")[0].innerHTML

        //let postResponse = await postWebsiteData(title,summary)
        }
        catch(error){
            
        }
    }
   else{

   }
    
    

    

}

async function getWebsiteData() {
    //Devuelve un Json con la información de la pagina.
    let[tab] = await chrome.tabs.query({active:true, currentWindow: true})
    let currentUrl = tab.url
    var documento = document.createElement('a')
    documento.href = currentUrl
    let formattedUrl = "https://"+documento.hostname
    const response = await fetch(url+`websites/?url=${formattedUrl}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            //1'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        });
        let res = await response.json()
        return res
}

async function postWebsiteData(tabTitle, summaryFormattedText) {
    let[tab] = await chrome.tabs.query({active:true, lastFocusedWindow: true})
    
    let currentUrl = tab.url
    var documento = document.createElement('a')
    documento.href = currentUrl
    let formattedUrl = "https://"+documento.hostname

    const response = await fetch(url+'websites/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
                nombre: tabTitle,
                url: formattedUrl,
                resumen: summaryFormattedText
            }) // body data type must match "Content-Type" header
        });
        let res = await response.json() 
        return res?.key  
}
function getRandomValue() {
    let min = 70;
    let max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { PageInfoTemplate, loadPageInfo };
