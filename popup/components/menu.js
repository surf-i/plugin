function Menu(object) {
    return(
      ` 
        <div class="SurfiComponent menu">
            <a href=${object?.url} target="parent">
                <button type="button" class="menu_button" id="menu_home">                
                    <span class="material-icons menu_icon">home</span>
                </button>
            </a>
            <button type="button" class="menu_button" id="menu_account_circle">
                <span class="material-icons menu_icon">account_circle</span>
            </button>
            <button type="button" class="menu_button" id="menu_settings">
                <span class="material-icons menu_icon">settings</span>
            </button>
        </div>
        `
    )
}
 

export default Menu