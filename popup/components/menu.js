import { Component } from "../../scripts/core.mjs"

function Menu(object) {
    return(
      Component.html` 
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
    )
}
 

export default Menu