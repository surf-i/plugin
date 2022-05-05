import Menu from "../components/Menu.js"

function HomeTemplate(object) {
    return (
        `
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Home</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onSubmit={handleSubmit}
                >
                <button
                    class="sign_in_btn"
                    id="HomeToReviewButton"
                >
                Review
                </button>
                <button
                    class="sign_in_btn"
                    id="HomeToPageInfoButton"
                    >
                    Page Information
                </button>
                </form> 
            </div>
            ${Menu()}
        </div>
        `
    )
}

function mount(){
    
}



export { HomeTemplate }