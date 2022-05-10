import SettingsInput from "../components/SettingsInput.js"
import Menu from "../components/Menu.js"
import { Component } from "../../scripts/core.mjs"

let configs = ["Modo Ste Men","Modo Pro","Modo iPhone 13","Modo La lider","Modo MotoMoto","Modo PizzaHaus"]
class Settings extends Component{
    setTemplate(props){
        Component.html`
        <div class="SurfiComponent page-container"> 
            <button id="logOutButton">
                <span class="material-icons">logout</span>
            </button>   
            <h2 class="title">Settings</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form class="SignInComponent_form">
                ${configs.map(e => SettingsInput({title: e})).join('')}
                </form>
            </div>
            ${Menu()}
        </div>
        `
    }
}



export { Settings }