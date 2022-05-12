function PageInfoTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">
        <link rel="stylesheet" href="../main/popup.css">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <p id="website-title"></p>
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
    )
}

chrome.runtime.sendMessage({ msg: "getCurrentTab" }, function (response) {
    let tabTitle = response.title;
    let maxLength = 50;
    tabTitle = ((tabTitle.length > maxLength) ? tabTitle.substring(0, maxLength) + "..." : tabTitle);
    document.getElementById("website-title").innerHTML = tabTitle;
});

export { PageInfoTemplate }
