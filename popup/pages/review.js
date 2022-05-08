
function ReviewTemplate(object) {
    return(
        /*html*/`
        <div class="SurfiComponent page-container">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">Page Name</h2>
        <div sytle="display: flex; flex-direction: column">
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
            <span class="material-icons star_icon">star</span>
        </div>
        <div class="slidecontainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
          </div>
          <div class="slidecontainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
          </div>
          <div class="slidecontainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
        <button
            class="sign_in_btn"
            id="ReviewToStartButton"
            >
            Sends
        </button>
    </div>
    `
    )
}

export { ReviewTemplate }
