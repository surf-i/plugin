function CitationResultsTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <div class="summary">
            <h3 class="summary_title">APA</h3>
            <p class="summary_text" id="apaCitation"></p>
        </div>

        <div class="summary">
            <h3 class="summary_title">IEEE</h3>
            <p class="summary_text" id="ieeeCitation"></p>
        </div>

        <div class="summary">
            <h3 class="summary_title">Chicago</h3>
            <p class="summary_text" id="chicagoCitation"></p>
        </div>

    </div>
    `
    )
}

function applyCitations(apa, ieee, chicago)
{
    document.getElementById("apaCitation").innerHTML = apa;
    document.getElementById("ieeeCitation").innerHTML = ieee;
    document.getElementById("chicagoCitation").innerHTML = chicago;
}

export{CitationResultsTemplate, applyCitations }