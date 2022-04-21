import UserInput from "../components/UserInput.js"

function LogInTemplate(object) {
    return (
        `
        <div class="SurfiComponent">    
            <h2 class="title">Login</h2>
            <!-- <img src="assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
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
                <button class="SignInComponent_SingUp">Sign Up</button>
            </div>
        </div>
        `
    )
}

export { LogInTemplate }