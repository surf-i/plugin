// sets a unified javascript to import pages
'use strict'
import Cookies from '../../lib/js.cookie.mjs'
import { addElement, deleteElement } from '../../scripts/core.js'
import { StartTemplate } from '../pages/start.js'
import { LoginTemplate } from '../pages/login.js'
import { ReviewTemplate } from '../pages/review.js'
import { SignUpTemplate } from '../pages/signup.js'

const body = document.body
const routes = {
    "start": StartTemplate,
    "login": LoginTemplate,
    "review": ReviewTemplate,
    "signup": SignUpTemplate
}

//sets the sate of the app
if(Cookies.get('state') == undefined){
    Cookies.set('state', 'review')
}
var state = Cookies.get('state')

setPage(state)

// var page = document.getElementById()


function setPage(page) {
    deleteElement(body.children[0])
    Cookies.set('state',(state = page))
    console.log(state)
    addElement(null, routes[state], body)
    if (state === 'start') {
        var event = document.getElementById("StartToLogInButton").addEventListener("click", function () { setPage('login') });
        var SignUpButton = document.getElementById("LogInToSignUpButton").addEventListener("click", function () { setPage('signup') });
        //getHTML()
    }
    if(state === 'signup'){
        var SignUpButton = document.getElementById("SignUpToStartButton").addEventListener("click", function () { setPage('start') });
    }
    if (state === 'login') {
        var eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function () { setPage('review') });
    }
    if (state === 'review') {
        var eventReview = document.getElementById("ReviewToStartButton").addEventListener("click", function () { setPage('start') });
    }

}








// function include(filePath) {
//     const scriptTag = document.createElement("script");
//     scriptTag.type = 'module'
//     scriptTag.src = filePath;
//     document.body.appendChild(scriptTag);
// }

// function includePages(...urls) {
//     urls.forEach(e => include(e))
// }

//for production
// includePages('./pages/start.js')

//this part can be usefull for page to page testing
// include('./pages/start.js')