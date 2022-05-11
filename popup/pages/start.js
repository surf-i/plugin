import { Component, Surfen } from "../../scripts/core.mjs";
import { LogIn } from "./LogIn.js";
import { SignUp } from "./SignUp.js";

class Start extends Component {
    initialize(){
        this.html`
        <div class="SurfiComponent page-container" id="Start">    
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
        this.addEvent('StartToLogInButton','click', Surfen.navegate, [this, new LogIn()])
        this.addEvent('LogInToSignUpButton','click', Surfen.navegate, [this, new SignUp()])
    }
}

export {Start}
