// sets a unified javascript to import pages
'use strict'

import { addElement, deleteElement} from '../scripts/core.js'
import { StartTemplate } from './pages/start.js'
import { LogInTemplate } from './pages/logIn.js'

const body = document.body
const routes = {
    "start" : StartTemplate,
    "login": LogInTemplate
}

var state = 'start'
var url = 'http://ec2-54-81-183-223.compute-1.amazonaws.com/'
// var page = document.getElementById()


function setPage(page, body){
    console.log(page)
    deleteElement(body.children[0])
    state = page
    addElement(null, routes[state], body)    
    if( state === 'start'){
        var event =  document.getElementById("StartToLogInButton").addEventListener("click", function(){setPage('login', body)});
        fetch(url+'websites/?url=www.gooogle.com')
            .then(response => response.json())
            .then(data => console.log(data));
    }
    
    if( state === 'login'){
        var eventLog =  document.getElementById("LogInToStartButton").addEventListener("click", function(){setPage('start', body)});
        // fetch(url+'dj-rest-auth/login/', 
        // {
        //     method: 'POST'
        // })
        // .then(response => response.json())
        // .then(data => console.log(data));
    }
    
}

setPage('start', body)







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