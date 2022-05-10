import { Component } from "../../scripts/core.mjs";

class PageInfo extends Component{
    setTemplate(props){
        Component.html`
        <div class="SurfiComponent page-container">
        <link rel="stylesheet" href="../main/popup.css">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">Paris</h2>
        <h3>Wikipedia</h3>
        <div sytle="display: flex; flex-direction: column">
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
        </div>
        <div class="pie-container">
            <div class="pie animate" style="--p:80;--c: var(--color-E3);"> 80%</div>
            <div class="category">
                <p>Social</p>
            </div>
        </div>
        <div class="summary">
            <h3 class="summary_title">Resumen</h3>
            <p class="summary_text">París es la capital de Francia, con una población de 2 273 305 habitantes. Se encuentra en europa. Es uno de lo núcleos económicos de la región. </p>
        </div>
        <button
            class="sign_in_btn"
            id="ReviewToStartButton"
            >
            Review
        </button>
        <button class="SignInComponent_SingUp" id="LogInToSignUpButton">Ver Reseñas</button>
    </div>
    `
    }
}

export { PageInfo }
