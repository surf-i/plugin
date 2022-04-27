import UserInput from "../components/UserInput.js"
import Menu from "../components/Menu.js"

function AccountTemplate(object) {
    return (
        `
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Account</h2>
            <span class="material-icons accountLogo">account_circle</span>
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onSubmit={handleSubmit}
                >
                <button
                    class="sign_in_btn"
                    id="LogInToStartButton"
                >
                    Juan Carlitos easterEgg
                </button>
                </form>
            </div>
            ${Menu()}
        </div>
        `
    )
}

export { AccountTemplate }