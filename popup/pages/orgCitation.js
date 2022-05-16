import UserInput from "../components/UserInput.js"
import {citeAPAOrganization, citeIEEEOrganization,  citeChicagoOrganization} from "../../scripts/logic/citing.js"

function OrgCitationTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">Organization</h2>
        <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
        <div class="SignInComponent_container" id="citationFormOrg">
            
            <form
            class="ContentBox"
            >
            ${UserInput({ id: 'authorNameComp',title: 'Organization Name', type: "text", name:'orgName' })}
            ${UserInput({ id: 'websiteNameComp',title: 'Website Name', type: "text", name:'websiteName' })}
            ${UserInput({ id: 'webpageNameComp',title: 'Current Page Name', type: "text", name:'webpagename' })}
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

async function citeOrg(e)
{
    e.preventDefault()
    let date = dateOfPublication.value.split('-')
    let year = date[2]
    let month = date[1]
    let day = date[0]

    let[tab] = await chrome.tabs.query({active:true, currentWindow: true})
    let url = tab.url

    let today = new Date()
    var dayCurrent = String(today.getDate()).padStart(2, '0')
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    var monthCurrent = monthNames[today.getMonth()]
    var yearCurrent = today.getFullYear()

    let apaCitation = citeAPAOrganization(orgName, year, month, day, webpageName, url)
    let ieeecitation = citeIEEEOrganization(orgName, websiteName, webpageName, yearCurrent, monthCurrent, dayCurrent, url)
    //Get current year
    let chicagoCitation = citeChicagoOrganization( orgName, websiteName, webpageName, year, month, day, url)
    //Redirect to citation result page
}

export{OrgCitationTemplate, citeOrg}