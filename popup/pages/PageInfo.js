const maxTitleLength = 50;
const maxSummaryLength = 300;
let randomValue = getRandomValue();

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
            <div class="pie animate" style="--p:${randomValue};--c: var(--color-E3);">${randomValue}%</div>
            <div class="category">
                <p>Not rated</p>
            </div>
        </div>
        <div class="summary">
            <h3 class="summary_title">Summary</h3>
            <p class="summary_text"></p>
        </div>
    </div>
    `
    )
}

async function loadPageInfo() {
    chrome.runtime.sendMessage({ msg: "getCurrentTab" }, function (response) {
        let tabTitle = response.title;
        tabTitle = ((tabTitle.length > maxTitleLength) ? tabTitle.substring(0, maxTitleLength) + "..." : tabTitle);
        document.getElementById("website-title").innerHTML = tabTitle;
    });

    chrome.runtime.sendMessage({ msg: "getWebsiteFirstParagraph" }, function (response) {
        let p = response;
        p = (p.includes(undefined)) ? "No summary available" : p;
        p = ((p.length > maxSummaryLength) ? p.substring(0, maxSummaryLength) + "..." : p);
        console.log(p)
        document.getElementsByClassName("summary_text")[0].innerHTML = p;
    });
}

function getRandomValue() {
    let min = 70;
    let max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

await loadPageInfo();

export { PageInfoTemplate, loadPageInfo };
