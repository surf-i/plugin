import UserInput from "../components/UserInput.js"

function SignUpTemplate(object) {
    return (
        `
        <div class="SurfiComponent page-container">    
            <h2 class="title">SignUp</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onsubmit="handleSubmit"
                >
                ${UserInput({ id: 'email', title: 'Email', type: "email" })}
                ${UserInput({ id: 'username', title: 'Username', type: "text" })}
                ${UserInput({ id: 'password', title: 'Password', type: "password" })}
                ${UserInput({ id: 'password', title: 'Password', type: "password" })}
                <button 
                    class="sign_in_btn"
                    id="SignUpToStartButton"
                >
                    Sign Up
                </button>
                </form>
            </div>
        </div>
        `
    )
}

export { SignUpTemplate }