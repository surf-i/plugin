import Menu from "../components/Menu.js"

function HomeTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container">   
            <h2 class="title">Home</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="homeComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onSubmit={handleSubmit}
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
                </form>
            </div>
            ${Menu()}
        </div>
        `
    )
}

function mount() {

}



export { HomeTemplate }