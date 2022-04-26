// sets a unified javascript to import pages
'use strict'
import Cookies from '../../lib/js.cookie.mjs'
import { addElement, deleteElement } from '../../scripts/core.js'
import { StartTemplate } from '../pages/start.js'
import { LoginTemplate } from '../pages/login.js'
import { ReviewTemplate } from '../pages/review.js'
import { SignUpTemplate } from '../pages/signup.js'

const body = document.body
var url = 'http://44.195.183.116/'

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

var token = Cookies.get('token')

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
        // fetch(url+'websites/?url=www.gooogle.com')
        // .then(response => response.json())
        // .then(data => console.log(data));
        try{
            logIn("surfitest@yopmail.com","","testpass123")
        }catch{
            //  
        }
        //getHTML()
    }else{
        var backButton = document.getElementById("backButton").addEventListener("click", function () { setPage('start') });
    }
    if(state === 'signup'){
        var SignUpButton = document.getElementById("SignUpToStartButton").addEventListener("click", function () { setPage('start') });
    }
    if (state === 'login') {
        var eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function () { consoleLog('surfitest@yopmail.com','testpass123') });
        
    }
    if (state === 'review') {
        var eventReview = document.getElementById("ReviewToStartButton").addEventListener("click", function () { setPage('start') });
    }

}


function consoleLog(username, password){
    
}

async function logIn(username,email, password) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url+'dj-rest-auth/login/', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
          username: username,
          email: email,
          password: password
      }) // body data type must match "Content-Type" header
    });
    let res = await response.json() 
    Cookies.set('token', res?.key) // parses JSON response into native JavaScript objects
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