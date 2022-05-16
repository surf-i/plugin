

function CitationResultsTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <div class="summary">
            <div class = "citation">
                <h3 class="summary_title">APA</h3>
                <button id = "APAButton">Copy text</button>
            </div>
            <p class="summary_text" id="apaCitation"></p>
        </div>

        <div class="summary">
            <div class = "citation">
                <h3 class="summary_title">IEEE</h3>
                <button id = "IEEEButton">Copy text</button>
            </div>
            <p class="summary_text" id="ieeeCitation"></p>
        </div>

        <div class="summary">
            <div class = "citation">
                <h3 class="summary_title">Chicago</h3>
                <button id = "chicagoButton">Copy text</button>
            </div>
            <p class="summary_text" id="chicagoCitation"></p>
        </div>

    </div>
    `
    )
}

function applyCitations(apa, ieee, chicago) {
    document.getElementById("apaCitation").innerHTML = apa;
    document.getElementById("ieeeCitation").innerHTML = ieee;
    document.getElementById("chicagoCitation").innerHTML = chicago;
}

function copyCitation(citationType) {
    console.log("Hola")
    var copyText = document.getElementById(citationType).innerHTML;
    copyText = copyText.replace("<i>","")
    copyText = copyText.replace("</i>","")
    var textArea = document.createElement('textarea');
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.value = copyText;
    textArea.select();
    document.execCommand('copy');
}

export { CitationResultsTemplate, applyCitations, copyCitation }