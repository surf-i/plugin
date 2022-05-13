import { Component } from "../../scripts/core.mjs"
import Menu from "../components/Menu.js"

class Home extends Component{
    initialize = (props) => {
        this.html`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Home</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                >
                <button
                class="sign_in_btn"
                id="HomeToReviewButton"
                >
                Review
                    </button>
                    <button
                    class="sign_in_btn"
                    id="HomeToPageInfoButton"
                    >
                    Page Information
                </button>
            </form> 
        </div>
        ${new Menu()}
        </div>
         `
    }
}



export { Home }