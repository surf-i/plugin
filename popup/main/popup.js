// sets a unified javascript to import pages
'use strict'
import Cookies from '../../lib/js.cookie.mjs'
import { addElement, deleteElement } from '../../scripts/core.mjs'
import { StartTemplate } from '../pages/Start.js'
import { LoginTemplate, loginFunction } from '../pages/LogIn.js'
import { ReviewTemplate } from '../pages/Review.js'
import { SignUpTemplate, signUpFunction, validateForm } from '../pages/SignUp.js'
import { HomeTemplate } from '../pages/Home.js'
import { AccountTemplate } from '../pages/Account.js'
import { PageInfoTemplate } from '../pages/PageInfo.js'
import { SettingsTemplate } from '../pages/Settings.js'


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
  "settings": SettingsTemplate
}

//sets the sate of the app
if (Cookies.get('state') == undefined) {
  Cookies.set('state', 'start')
  Cookies.set('before', 'start')
}
var [state, before] = [Cookies.get('state'), Cookies.set('before')]
var token = Cookies.get('token')

setPage(state)

// var page = document.getElementById()
var backButton = document.getElementById("backButton")?.addEventListener("click", function () { setPage('start') });

function setPage(page) {
  deleteElement(body.children[0])
  Cookies.set('before', (before = before == state ? before : state))
  Cookies.set('state', (state = page))
  console.log(state)
  addElement(null, routes[state], body)


  if (state === 'start') {
    var event = document.getElementById("StartToLogInButton").addEventListener("click", function () { setPage('login') });
    var SignUpButton = document.getElementById("LogInToSignUpButton").addEventListener("click", function () { setPage('signup') });
    // fetch(url+'websites/?url=www.gooogle.com')
    // .then(response => response.json())
    // .then(data => console.log(data));
  }
  if (state === 'signup') {
    let email = document.getElementById('email')
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    let password2 = document.getElementById('passwordVerif')

    //eventos feos
    let emailEvent = email.addEventListener('change', function () { validateForm(email, username, password, password2) })
    let usernameEvent = username.addEventListener('change', function () { validateForm(email, username, password, password2) })
    let passwordEvent = password.addEventListener('change', function () { validateForm(email, username, password, password2) })
    let password2Event = password2.addEventListener('change', function () { validateForm(email, username, password, password2) })

    var SignUpButton = document.getElementById("SignUpToHomeButton").addEventListener("click", function () { signUp() });
  }
  if (state === 'login') {
    var eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function (event) { logIn(event) });
    var eventLog = document.getElementById("LogInToSignUpButton").addEventListener("click", function (event) { setPage('signup') });
    /*
      try{
          logIn("surfitest@yopmail.com","","testpass123")
      }catch{
          //  
      }
      */
  }
  if (state === 'login' || state === 'signup' || state === 'review' || state == 'pageinfo') {
    var backButton = document.getElementById("backButton").addEventListener("click", function () { setPage(before) });
  }
  if (state === 'review') {
    var eventReview = document.getElementById("ReviewToStartButton").addEventListener("click", function () { setPage('pageinfo') });
  }
  if (state === 'account' || state === 'home' || state === 'settings') {
    var menuHomeButton = document.getElementById("menuHomeButton").addEventListener("click", function () { setPage('home') });
    var menuAccountButton = document.getElementById("menuAccountButton").addEventListener("click", function () { setPage('account') });
    var menuSetttingsButton = document.getElementById("menuSetttingsButton").addEventListener("click", function () { setPage('settings') });

  }
  if (state === 'home') {
    var eventHomeReview = document.getElementById("HomeToReviewButton").addEventListener("click", function () { setPage('review') });
    var eventHomeReview = document.getElementById("HomeToPageInfoButton").addEventListener("click", function () { setPage('pageinfo') });

  }
  if (state === 'settings') {
    var LogOut = document.getElementById("logOutButton").addEventListener("click", function () { setPage('start') });
  }


}

async function logIn(event) {
  let logInToken = await loginFunction(event)
  if (logInToken != null) {
    Cookies.set('token', logInToken)
    setPage('home')
  } else {
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

// TODO: Rendering, eventos, claseSurfi