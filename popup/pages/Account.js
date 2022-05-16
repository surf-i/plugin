import Menu from "../components/Menu.js"

function AccountTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">  
            <h2 class="title">Account</h2>
            <span class="material-icons accountLogo">account_circle</span>
            <div class="SignInComponent_container" id="Form">
                <form
                class="ContentBox"
                >
                <button
                    disabled
                    class="sign_in_btn"
                    id="LogInToStartButton"
                >
                    Account features coming soon!
                </button>
                </form>
            </div>
            ${Menu()}
        </div>
        `
    )
}

export { AccountTemplate }