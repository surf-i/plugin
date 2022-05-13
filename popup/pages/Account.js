import Menu from "../components/Menu.js"
import { Component } from "../../scripts/core.mjs"

class Account extends Component{
    initialize(props) {
        this.html`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Account</h2>
            <span class="material-icons accountLogo">account_circle</span>
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                >
                <button
                    class="sign_in_btn"
                    id="LogInToStartButton"
                >
                   Account Name
                </button>
                </form>
            </div>
            ${new Menu()}
        </div>
        `
    }
}

export { Account }