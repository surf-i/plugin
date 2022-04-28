import SettingsInput from "../components/SettingsInput.js"
import Menu from "../components/Menu.js"

function SettingsTemplate(object) {
    return (
        `
        <div class="SurfiComponent page-container"> 
            <button id="logOutButton">
                <span class="material-icons">logout</span>
            </button>   
            <h2 class="title">Settings</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form class="SignInComponent_form">
                ${SettingsInput({title: "Modo Ste Men"})}
                ${SettingsInput({title: "Modo Pro"})}
                ${SettingsInput({title: "Modo iPhone 13"})}
                ${SettingsInput({title: "Modo La lider"})}
                ${SettingsInput({title: "Modo MotoMoto"})}
                ${SettingsInput({title: "Modo PizzaHaus"})}
                </form>
            </div>
            ${Menu()}
        </div>
        `
    )
}

export { SettingsTemplate }