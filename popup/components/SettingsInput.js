// import './styles/AboutUs.css'

import { Component } from "../../scripts/core.mjs"

function SettingsInput(object) {
    return(
    Component.html` 
    <div class="SurfiComponent SettingsInput">
        <p class="SettingsInputTitle">${object.title}</p>
        <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
        </label>
    </div>
    `
    )
}

export default SettingsInput