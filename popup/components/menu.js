import { Component, Surfen } from "../../scripts/core.mjs"
import { Account } from "../pages/Account.js"
import { Home } from "../pages/Home.js"
import { Settings } from "../pages/Settings.js"

class Menu extends Component {
    initialize(){
        this.html` 
        <div class="SurfiComponent menu">
            <button type="button" class="menu_button" id="menuHomeButton">                
                <span class="material-icons menu_icon">home</span>
            </button>
            <button type="button" class="menu_button" id="menuAccountButton">
                <span class="material-icons menu_icon">account_circle</span>
            </button>
            <button type="button" class="menu_button" id="menuSetttingsButton">
                <span class="material-icons menu_icon">settings</span>
            </button>
        </div>
        `
    }
    render(){
        this.addEvent('menuHomeButton','click', Surfen.navigate, [this, new Home()])
        this.addEvent('menuAccountButton','click', Surfen.navigate, [this, new Account()])
        this.addEvent('menuSetttingsButton','click', Surfen.navigate, [this, new Settings()])
    }
}
 
export default Menu