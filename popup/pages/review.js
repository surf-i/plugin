import Cookies from "../../lib/js.cookie.mjs";
import Rating from "../components/rating.js";
var url = 'https://44.195.183.116/'

function ReviewTemplate(object) {
    return(
        /*html*/`
        <div class="SurfiComponent page-container">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">My review</h2>
        <form>
            ${Rating()}
            <span id="RateValue" name="stars" style="display: none;">0</span>  
            <div class="slidecontainer">
                <label for="myRange" title="text">Trust level</label>
                <input type="range" min="1" max="100" class="slider" id="myRange">
            </div>

            <div class="custom-select" style="width:200px;">
                <select name="optionMenu" id="optionMenu">
                    <option value="0">Select category:</option>
                    <option value="INVESTIGACION">Investigación</option>
                    <option value="PERIODISMO">Periodismo</option>
                    <option value="ENTRETENIMIENTO">Entretenimiento</option>
                    <option value="COMERCIO">Comercio</option>
                    <option value="HERRRAMIENTA">Herramienta</option>
                    <option value="SOCIAL">Social</option>
                    <option value="ORGANIZACION">Organización</option>
                    <option value="ACADEMICO">Académico</option>
                </select>
            </div>
            
            <button
                disabled
                class="sign_in_btn"
                id="ReviewToStartButton"
                type = "submit"
                >
                Send
            </button>
        </form>
    </div>
    `
    )
}

async function reviewFunction(e) {
    e.preventDefault()

    let trustLevel = updatetrustLevel()
    let stars = document.getElementById('RateValue').textContent 
    let cat = document.getElementById('optionMenu').value

    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    today = yyyy+'-'+mm+'-'+dd

    let[tab] = await chrome.tabs.query({active:true, currentWindow: true})
    let u = tab.url
    const response = await fetch(url+'users/reviews/add/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
                url: u,
                review: {
                    comentario: null,
                    calificacion: parseInt(stars),
                    gradoVeracidad: trustLevel,
                    fecha: today,
                    categoria: cat,
                    calificacionDiseno: 0,
                    calificacionUsabilidad: 0
                }
            }) // body data type must match "Content-Type" header
        });
        let res = await response.json()
        return res?.key  
}

function validateCategory(category){
    let a = (category.selectedIndex==="0")
    document.getElementById('ReviewToStartButton').disabled = a
}

function updatetrustLevel(){
    let slider = document.getElementById('myRange')
    return (slider.value)
}

function updateRating(star){
    document.getElementById('RateValue').textContent = star.value
}

export { ReviewTemplate, reviewFunction, validateCategory, updateRating }
