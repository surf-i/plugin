const maxTitleLength = 50;
const maxSummaryLength = 300;

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
            <p class="summary_text"></p>
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
    tabTitle = ((tabTitle.length > maxTitleLength) ? tabTitle.substring(0, maxTitleLength) + "..." : tabTitle);
    document.getElementById("website-title").innerHTML = tabTitle;
});

chrome.runtime.sendMessage({ msg: "getWebsiteFirstParagraph" }, function (response) {
    let p = response;
    p = ((p.length > maxSummaryLength) ? p.substring(0, maxSummaryLength) + "..." : p + ".");
    document.getElementsByClassName("summary_text")[0].innerHTML = p;
});

export { PageInfoTemplate }
