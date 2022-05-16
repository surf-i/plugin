
function CitateTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Create Citation</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="ContentBox"
                >
                <div class="SurfiDropdown_container">
                <select name="optionMenu" class="SurfiDropdown" id="citationFormatOpt">
                    <option value="none" selected disabled hidden>Select format:</option>
                    <option class="Investigacion" value="AUTHOR">Citate Author</option>
                    <option class="Periodismo" value="ORG">Citate Organization</option>
                    <option class="Entretenimiento" value="UNKNOWN">Citate Unknown Author</option>
                </select>
            </div>

                <button
                    disabled
                    class="sign_in_btn"
                    id="CitateToFormat"
                    >
                    Create Citation
                </button>
                </form>
            
        `
    )
}

function citate(){
return document.getElementById("citationFormatOpt").value
}

function validateChoice(formatChoice){
    let a = (formatChoice.value==="none")
    document.getElementById('CitateToFormat').disabled = a
}

export {CitateTemplate, citate, validateChoice}