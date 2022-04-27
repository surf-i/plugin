
function PageInfoTemplate(object) {
    return(
        `
        <div class="SurfiComponent page-container">
        <link rel="stylesheet" href="../main/popup.css">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">Paris</h2>
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
        <button
            class="sign_in_btn"
            id="ReviewToStartButton"
            >
            Review
        </button>
    </div>
    `
    )
}

export { PageInfoTemplate }
