import Cookies from "../../lib/js.cookie.mjs";
import { getFormattedUrl } from "../../scripts/core.mjs";
import Rating from "../components/rating.js";
var url = 'http://44.195.183.116/'

function ReviewTemplate(object) {
    return(
        /*html*/`
        <div class="SurfiComponent page-container" id="Review">
        <button id="backButton">
            <span class="material-icons">arrow_back_ios</span>
        </button>
        <h2 class="title">My review</h2>
        <form id="Review_form">
            ${Rating()}
            <span id="RateValue" name="stars" style="display: none;">0</span>  
            <div class="Review_slidecontainer">
                <label for="myRange" title="text">Trust level</label>
                <input type="range" min="1" max="100" class="slider" id="myRange">
            </div>
            <div class="SurfiDropdown_container">
                <select name="optionMenu" class="SurfiDropdown" id="optionMenu">
                    <option value="none" selected disabled hidden>Select category:</option>
                    <option class="Investigacion" value="RESEARCH">Research</option>
                    <option class="Periodismo" value="NEWS">News</option>
                    <option class="Entretenimiento" value="ENTERTAINMENT">Entertainment</option>
                    <option class="Comercio" value="SHOPPING">Shopping</option>
                    <option class="Herramienta" value="PRODUCTIVITY">Productivity</option>
                    <option class="Social" value="SOCIAL">Social</option>
                    <option class="Organizacion" value="BUSINESS_ORG">Business/Org</option>
                    <option class="Academico" value="ACADEMIC">Academic</option>
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

async function reviewFunction(e, latestUrl) {
    e.preventDefault()

    let trustLevel = updatetrustLevel()
    let stars = document.getElementById('RateValue').textContent 
    let cat = document.getElementById('optionMenu').value

    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()
    today = yyyy+'-'+mm+'-'+dd

    //let[tab] = await chrome.tabs.query({active:true, currentWindow: true})  
    //let u = tab.url
    const response = await fetch(url+'users/reviews/add/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
                url: latestUrl,
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
    document.getElementById('optionMenu').className = 'SurfiDropdown '+category.value
}

function updatetrustLevel(){
    let slider = document.getElementById('myRange')
    return (slider.value)
}

function updateRating(star){
    let starElement = document.getElementById('RateValue')

    console.log(starElement.textContent,star.value, starElement.textContent == star.value)
    if(starElement.textContent == star.value){
        star.checked = false
        starElement.textContent = '0'
    }
    else{
        starElement.textContent = star.value
    }

}

export { ReviewTemplate, reviewFunction, validateCategory, updateRating }
