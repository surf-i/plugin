import { Component } from "../../scripts/core.mjs";

class Start extends Component {
    initialize(){
        this.html`
        <div class="SurfiComponent page-container">    
            <h2 class="title">Surfi</h2>
            <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo">
            <div class="container">
                <button type="button" class="sign_in_btn" id="StartToLogInButton">Log In</button>
                <button type="button" id="LogInToSignUpButton" class="sign_in_btn">Create Account</button>
            </div>
        </div>
        `
    }
    render(){

    }

}

export {Start}
