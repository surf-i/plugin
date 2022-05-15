import UserInput from "../components/UserInput.js"
import citeAPA from "../../scripts/citeAPA.js"
import citeIEEE from "../../scripts/citeIEEE.js"
import citeChicago from "../../scripts/citeChicago.js"


function citateAuthor(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">SignUp</h2>
        <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
        <div class="SignInComponent_container" id="citationFormAuthor">
            <form
            class="SignInComponent_form"
            >
            ${UserInput({ id: 'authorNameComp',title: 'Author Name', type: "text", name:'authorName' })}
            ${UserInput({ id: 'authorLastNameComp',title: 'Author Last Name', type: "text", name:'authorLastName' })}
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

function citeAuthor(e)
{
    e.preventDefault()
    let date = dateOfPublication.value.split('-')
    let year = date[2]
    let month = date[1]
    let day = date[0]
    let apaCitation = citeAPA(authorName, authorLastName, websiteName, webpageName, year, month, day)
    let ieeecitation = citeIEEE(authorName, authorLastName, websiteName, webpageName, year, month, day)
    //Get current year
    let chicagoCitation = citeChicago(authorName, authorLastName, websiteName, webpageName, year, month, day)
    //Redirect to citation result page
}
