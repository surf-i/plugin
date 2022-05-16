import Menu from "../components/Menu.js"

function AccountTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">  
            <h2 class="title">Account</h2>
            <span class="material-icons accountLogo">account_circle</span>
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                >
                <button
                    class="sign_in_btn"
                    id="LogInToStartButton">
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