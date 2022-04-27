// import './styles/AboutUs.css'

function SettingsInput(object) {
    return(
    ` 
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