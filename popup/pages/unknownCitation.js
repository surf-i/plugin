import UserInput from "../components/UserInput.js"
import {citeAPAUnknown, citeIEEEUnknown,  citeChicagoUnknown} from "../../scripts/logic/citing.js"

function UnknownCitationTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">Unknown Author Citation</h2>
        <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
        <div class="SignInComponent_container" id="citationFormUnknown">
            
            <form
            class="SignInComponent_form"
            >
            ${UserInput({ id: 'websiteNameComp',title: 'Website Name', type: "text", name:'websiteName' })}
            ${UserInput({ id: 'webpageNameComp',title: 'Current Page Name', type: "text", name:'webpageName' })}
            ${UserInput({ id: 'dateOfPublicationComp',title: 'Date of Publication', type: "date", name:'dateOfPublication' })}    
            </form>
            <button 
                disabled
                class="sign_in_btn"
                id="citateButton"
                type="submit"
            >
                Generate Citation
            </button>
        </div>
    </div>
    `
    )
}

async function citeUnknown(e)
{
    e.preventDefault()
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

    let date = dateOfPublication.value.split('-')
    let year = date[2]
    let month = monthNames[date[1]-1]
    let day = date[0]

    let[tab] = await chrome.tabs.query({active:true, currentWindow: true})
    let url = tab.url

    let today = new Date()
    var dayCurrent = String(today.getDate()).padStart(2, '0')
    var monthCurrent = monthNames[today.getMonth()]
    var yearCurrent = today.getFullYear()

    let apaCitation = citeAPAUnknown(webpageName.value, websiteName.value,  year, month, day, url)
    let ieeecitation = citeIEEEUnknown(webpageName.value,  yearCurrent, monthCurrent, dayCurrent, url)
    //Get current year
    let chicagoCitation = citeChicagoUnknown(webpageName.value, websiteName.value, year, month, day, url)
    //Redirect to citation result page
    return [apaCitation, ieeecitation, chicagoCitation]
}

function validateCitationU(date, webpage, website){
    let a = (
            webpage.value.length >0 &&
            website.value.length >0 &&
            date.value.split('-').length>1
            )
    document.getElementById('citateButton').disabled = !a;
}

export {UnknownCitationTemplate, citeUnknown, validateCitationU}