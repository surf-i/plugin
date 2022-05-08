import Cookies from "../../lib/js.cookie.mjs";
import Rating from "../components/rating.js"

function ReviewTemplate(object) {
    return(
        /*html*/`
        <div class="SurfiComponent page-container">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">My review</h2>
            ${Rating()}
        <div class="slidecontainer">
            <label for="myRange" title="text">Veracity</label>
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>

        <div class="custom-select" style="width:200px;">
            <select>
                <option value="0">Select category:</option>
                <option value="1">Investigación</option>
                <option value="2">Periodismo</option>
                <option value="3">Entretenimiento</option>
                <option value="4">Comercio</option>
                <option value="5">Herramienta</option>
                <option value="6">Social</option>
                <option value="7">Organización</option>
            </select>
        </div>
          
        <button
            class="sign_in_btn"
            id="ReviewToStartButton"
            >
            Send
        </button>
    </div>
    `
    )
}

async function reviewFunction() {
    const response = await fetch(url+'dj-rest-auth/registration/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bear ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
                username: username.value,
                email: email.value,
                password1: password.value,
                password2: passwordVerif.value
            }) // body data type must match "Content-Type" header
        });
        let res = await response.json() 
        return res?.key  
}


export { ReviewTemplate }
