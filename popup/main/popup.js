// sets a unified javascript to import pages
'use strict'
import Cookies from '../../lib/js.cookie.mjs'
import { addElement, deleteElement } from '../../scripts/core.mjs'
import { StartTemplate } from '../pages/Start.js'
import { LoginTemplate, loginFunction, closeMessage, errorMessage } from '../pages/LogIn.js'
import { ReviewTemplate, reviewFunction, validateCategory, updateRating } from '../pages/Review.js'
import { SignUpTemplate, signUpFunction, validateForm } from '../pages/SignUp.js'
import { HomeTemplate } from '../pages/Home.js'
import { AccountTemplate } from '../pages/Account.js'
import { PageInfoTemplate } from '../pages/PageInfo.js'
import { SettingsTemplate } from '../pages/Settings.js'
import { loadPageInfo } from '../pages/PageInfo.js'
import {CitateTemplate, citate, validateChoice} from '../pages/citation.js'
import { AuthorCitationTemplate } from '../pages/authorCitation.js'
import { UnknownCitationTemplate } from '../pages/unknownCitation.js'
import { OrgCitationTemplate } from '../pages/orgCitation.js'


const body = document.body
var url = 'http://44.195.183.116/'

const routes = {
  "start": StartTemplate,
  "login": LoginTemplate,
  "review": ReviewTemplate,
  "signup": SignUpTemplate,
  "home": HomeTemplate,
  "account": AccountTemplate,
  "pageinfo": PageInfoTemplate,
  "settings": SettingsTemplate,
  "cite": CitateTemplate,
  "authorCite": AuthorCitationTemplate,
  "unknownCite": UnknownCitationTemplate,
  "orgCite": OrgCitationTemplate
}

//sets the sate of the app
if (Cookies.get('state') == undefined) {
  Cookies.set('state', 'start')
  Cookies.set('before', 'start')
}
var [state, before] = [Cookies.get('state'), Cookies.set('before')]
var token = Cookies.get('token')

let latestUrl;
setPage(state)

// var page = document.getElementById()
var backButton = document.getElementById("backButton")?.addEventListener("click", function () { setPage('home') });

function setPage(page) {
    deleteElement(body.children[0])
    Cookies.set('before',(before = before ==  state? before: state))
    Cookies.set('state',(state = page))
    console.log(state)
    addElement(null, routes[state], body)

    
    if (state === 'start') {
        var event = document.getElementById("StartToLogInButton").addEventListener("click", function () { setPage('login') });
        var SignUpButton = document.getElementById("LogInToSignUpButton").addEventListener("click", function () { setPage('signup') });
    }
    if(state === 'signup'){
      let email = document.getElementById('email')
      let username = document.getElementById('username')
      let password = document.getElementById('password')
      let password2 = document.getElementById('passwordVerif')
      let firstname = document.getElementById('firstname')
      let lastname = document.getElementById('lastname')
      
      //eventos feos
      let emailEvent = email.addEventListener('input', function (){validateForm(email, username,password,password2,firstname,lastname)})
      let usernameEvent = username.addEventListener('input', function (){validateForm(email, username,password,password2,firstname,lastname)})
      let passwordEvent = password.addEventListener('input', function (){validateForm(email, username,password,password2,firstname,lastname)})
      let password2Event = password2.addEventListener('input', function (){validateForm(email, username,password,password2,firstname,lastname)})
      let firstNameEvent = firstname.addEventListener('input', function (){validateForm(email, username,password,password2,firstname,lastname)})
      let lastNameEvent = lastname.addEventListener('input', function (){validateForm(email, username,password,password2,firstname,lastname)})

      var SignUpButton = document.getElementById("SignUpToHomeButton").addEventListener("click", function (event) { signUp(event)});
    }
    if (state === 'login') {
      var eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function (event) {logIn(event) });   
      var eventLog = document.getElementById("LogInToSignUpButton").addEventListener("click", function (event) {setPage('signup') });  
      var eventClose = document.getElementsByClassName("closebtn")[0].addEventListener("click",function(){closeMessage()});
      /*
        try{
            logIn("surfitest@yopmail.com","","testpass123")
        }catch{
            //  
        }
        */
    }
    if(state === 'login' || state === 'signup'){
      var backButton = document.getElementById("backButton").addEventListener("click", function () { setPage(before) });
    }
    if(state === 'authorCite' || state === 'unknownCite'  || state === 'orgCite' ) {
      var backButton = document.getElementById("backButton").addEventListener("click", function (event) { setPage('cite') });

    }
    if(state === 'authorCite') {
      var backButton = document.getElementById("citateButton").addEventListener("click", function (event) { citationAuth(event) });

    }
    if (state === 'review' || state === 'pageinfo') {
      var backButton = document.getElementById("backButton").addEventListener("click", function () { setPage('home') });
    }

    if (state === 'review') {
      let category = document.getElementById('optionMenu')
      let star1 = document.getElementById('star1')
      let star2 = document.getElementById('star2')
      let star3 = document.getElementById('star3')
      let star4 = document.getElementById('star4')
      let star5 = document.getElementById('star5')

      let categoryEvent = category.addEventListener('change', function (){validateCategory(category)})
      let star1Event = star1.addEventListener('click', function (){updateRating(star1)})
      let star2Event = star2.addEventListener('click', function (){updateRating(star2)})
      let star3Event = star3.addEventListener('click', function (){updateRating(star3)})
      let star4Event = star4.addEventListener('click', function (){updateRating(star4)})
      let star5Event = star5.addEventListener('click', function (){updateRating(star5)})

      var eventReview = document.getElementById("ReviewToStartButton").addEventListener("click", function (event) { review(event, latestUrl) });
    }
    if(state === 'account' || state === 'home' || state === 'settings'){
      var menuHomeButton = document.getElementById("menuHomeButton").addEventListener("click", function () { setPage('home') });
      var menuAccountButton = document.getElementById("menuAccountButton").addEventListener("click", function () { setPage('account') });
      var menuSetttingsButton = document.getElementById("menuSetttingsButton").addEventListener("click", function () { setPage('settings') });
      
    }
    if (state === 'home'){
      var eventHomeCite = document.getElementById("HomeToCitateButton").addEventListener("click", function () { setPage('cite') });
      var eventHomePageInfo = document.getElementById("HomeToPageInfoButton").addEventListener("click", function () { setPage('pageinfo')});
      
    }
    if (state === 'cite'){
      let selectFormat = document.getElementById("citationFormatOpt")
      let FormatEvent = selectFormat.addEventListener('change', function (){validateChoice(selectFormat)})

      var eventHomePageInfo = document.getElementById("CitateToFormat").addEventListener("click", function () { citation()});
      var backButton = document.getElementById("backButton").addEventListener("click", function () { setPage('home') });
    }
    if(state === 'settings'){
      var LogOut = document.getElementById("logOutButton").addEventListener("click", function () { setPage('start') });
    }
    if(state == 'pageinfo'){
      
      var eventPageinfoReview = document.getElementById("PageinfoToReview").addEventListener("click", function () { setPage('review') });
      loadInfo()
    }


}

async function loadInfo(){
  await loadPageInfo()
  latestUrl = await loadPageInfo()
}

async function logIn(event) {
  let res = await loginFunction(event)
  let logInToken = res?.key
  if (logInToken != null) {
    Cookies.set('token', logInToken)
    setPage('home')
  } else {
    errorMessage()
    console.error("error logIn")
  }
}

async function signUp(event) {
  let logInToken = await signUpFunction(event)
  if (logInToken != null) {
    Cookies.set('token', logInToken)
    setPage('home')
  } else {
    console.error("error signUp")
  }
}

async function review(event, url) {
  let logInToken = Cookies.get('token')

  if (logInToken != null) {
    await reviewFunction(event, url)
    setPage('pageinfo')
    await loadPageInfo()
  } else {
    console.error("error need login")
    setPage('login')
  }
}

async function citation(event) {
    let format= citate(event)
    if (format==="AUTHOR"){
      setPage('authorCite')
    }
    else if (format === "ORG"){
      setPage('orgCite')
    }
    else {
      setPage('unknownCite')
    }
}




// TODO: Rendering, eventos, claseSurfi

