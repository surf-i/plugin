import Cookies from "../../lib/js.cookie.mjs";
import {StringHTML, getFormattedUrl } from "../../scripts/core.mjs";
import Rating from "../components/pageInfoRating.js";

const maxTitleLength = 50;
const maxSummaryLength = 247;
var backendUrl = 'http://44.195.183.116/';


function PageInfoTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 id="pageinfo-title"></h2>
        ${Rating()}
        <div class="pie-container" id="trustLevelPie">
            <div id="rawPie" class="pie animate" style="--p:0;--c: var(--color-E3);">0%</div>
            <div class="category">
                <p>Not rated</p>
            </div>
        </div>
        <div class="summary">
            <h3 class="summary_title">Summary</h3>
            <p class="summary_text"></p>
        </div>
        <button
                class="sign_in_btn"
                id="PageinfoToReview"
                type = "submit"
                >
                Create Review
        </button>
    </div>
    `
    )
}
let tabTitle;
let p;
async function loadPageInfo() {
    let pageInfo = await getWebsiteData()
    if ("error" in pageInfo){
        let titleResponse =  await chrome.runtime.sendMessage({ msg: "getCurrentTab" });
        tabTitle = titleResponse.title;
        tabTitle = ((tabTitle.length > maxTitleLength) ? tabTitle.substring(0, maxTitleLength) + "..." : tabTitle);
        document.getElementById("pageinfo-title").innerHTML = tabTitle;
        let summaryResponse = await chrome.runtime.sendMessage({ msg: "getWebsiteFirstParagraph" });
        p = summaryResponse;
        p = (p.includes(undefined)) ? "No summary available" : p;
        p = ((p.length > maxSummaryLength) ? p.substring(0, maxSummaryLength) + "..." : p);
        document.getElementsByClassName("summary_text")[0].innerHTML = p;
        await postWebsiteData(tabTitle,p)
    }
   else
   {
        tabTitle = pageInfo.nombre;
        document.getElementById("pageinfo-title").innerHTML = tabTitle;
        p = pageInfo.resumen;
        let rating = Math.round(pageInfo.gradoVeracidadPromedio);
        document.getElementsByClassName("summary_text")[0].innerHTML = p;
        document.getElementById("trustLevelPie").replaceChild(StringHTML(`<div id="rawPie" class="pie animate" style="--p:${rating};--c: var(--color-E3);">${rating}%</div>`), document.getElementById("trustLevelPie").children[0]);
        document.getElementsByClassName("category")[0].innerHTML = `<p>${pageInfo.categoria}</p>`;
        if (pageInfo.gradoVeracidadPromedio != 0)
        {
            let starNumber = Math.round(pageInfo.calificacionPromedio);
            document.getElementById(`Star${starNumber}`).className = "selected"
        } 
        return pageInfo.url
   }
    
}


async function getWebsiteData() {
    //Devuelve un Json con la información de la pagina.
    let[tab] = await chrome.tabs.query({active:true, currentWindow: true})
    let currentUrl = tab.url
    let formattedUrl = await getFormattedUrl(currentUrl)
    const response = await fetch(backendUrl+`websites/?url=${formattedUrl}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        });
        let res = await response.json()
        return res
}

async function postWebsiteData(tabTitle, summaryFormattedText) {
    let[tab] = await chrome.tabs.query({active:true, currentWindow: true})
    let currentUrl = tab.url
    let formattedUrl = await getFormattedUrl(currentUrl)
    const response = await fetch(backendUrl+'websites/', {
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
        return res
}

export { PageInfoTemplate, loadPageInfo }