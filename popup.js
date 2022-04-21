// sets a unified javascript to import pages
'use strict'

import { addElement, deleteElement } from '../scripts/core.js'
import { StartTemplate } from './pages/start.js'
import { LoginTemplate } from './pages/login.js'
import { ReviewTemplate } from './pages/review.js'

const body = document.body
const routes = {
    "start": StartTemplate,
    "login": LoginTemplate,
    "review": ReviewTemplate
}

var state = 'start'
// var page = document.getElementById()


function setPage(page) {
    console.log(page)
    deleteElement(document.body.children[0])
    state = page
    addElement(null, routes[state], body)

    if (state === 'start') {
        var event = document.getElementById("StartToLogInButton").addEventListener("click", function () { setPage('login') });
    }

    if (state === 'login') {
        var eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function () { setPage('review') });
    }

}

setPage('start')







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