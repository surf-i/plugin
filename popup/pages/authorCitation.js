import UserInput from "../components/UserInput.js"

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