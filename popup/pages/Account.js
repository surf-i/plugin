import UserInput from "../components/UserInput.js"
import Menu from "../components/Menu.js"

function AccountTemplate(object) {
    return (
        `
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons menu_icon">reply</span>
            </button>   
            <h2 class="title">Login</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onSubmit={handleSubmit}
                >
                ${UserInput({ id: 'email', title: 'Email', type: "email" })}
                ${UserInput({ id: 'password', title: 'Password', type: "password" })}
                <button
                    class="sign_in_btn"
                    id="LogInToStartButton"
                >
                    Sign In
                </button>
                </form>
                <button class="SignInComponent_SingUp" id="LogInToSignUpButton">Sign Up</button>
            </div>
            ${Menu()}
        </div>
        `
    )
}

export { AccountTemplate }