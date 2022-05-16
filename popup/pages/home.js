import Menu from "../components/Menu.js"

function HomeTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">   
            <h2 class="title">Home</h2>
            <div class="homeComponent_container" id="Form">
                <div
                class="ContentBox"
                >
                <button
                    class="sign_in_btn"
                    id="HomeToPageInfoButton"
                    >
                    Page Information
                </button>

                <button
                    class="sign_in_btn"
                    id="HomeToCitateButton"
                    >
                    Create Citation
                </button>
                </div>
            </div>
            ${Menu()}
        </div>
        `
    )
}

export { HomeTemplate }