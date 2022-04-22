
function StartTemplate(object) {
    return (
        `
        <div class="SurfiComponent page-container">    
            <h2 class="title">Surfi</h2>
            <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo">
            <div class="container">
                <button type="button" class="sign_in_btn" id="StartToLogInButton">Log In</button>
                <button type="button" class="sign_in_btn">Create Account</button>
            </div>
        </div>
        `
    )
}

export {StartTemplate}