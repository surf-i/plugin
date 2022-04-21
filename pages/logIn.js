
function LogInTemplate(object) {
    return(
        `
        <div class="SurfiComponent">    
            <h2 class="title">Surfi</h2>
            <!-- <img src="assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onSubmit={handleSubmit}
                >
                <div class="UserInput_item" id="email">
                    <label htmlFor="">Email</label>
                    <input type="email" />
                </div>
                <div class="UserInput_item" id="email">
                    <label htmlFor="">password</label>
                    <input type="password" />
                </div>
                <!-- <UserInput id="2" title="Email" type="email" name={email} /> -->
                <button
                    class="sign_in_btn"
                    id="LogInToStartButton"
                >
                    SIGN IN
                </button>
                </form>
                <button class="SignInComponent_SingUp">Sign Up</button>
            </div>
        </div>
        `
    )
}

export {LogInTemplate}