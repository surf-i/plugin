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
import { AuthorCitationTemplate, citeAuthor, validateCitationA } from '../pages/authorCitation.js'
import { UnknownCitationTemplate,  citeUnknown, validateCitationU} from '../pages/unknownCitation.js'
import { OrgCitationTemplate, citeOrg, validateCitationO} from '../pages/orgCitation.js'
import {CitationResultsTemplate, applyCitations, copyCitation} from '../pages/citationResults.js'


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
  "orgCite": OrgCitationTemplate,
  "citeResults": CitationResultsTemplate
}

//sets the sate of the app
var token = Cookies.get('token')
if (token == undefined) {
  setPage('start')
}else{
  setPage('home')
}

let latestUrl;
let citationResults;

// var page = document.getElementById()

function setPage(page) {
    deleteElement(body.children[0])
    addElement(null, routes[page], body)
    if (page === 'start') {
        var event = document.getElementById("StartToLogInButton").addEventListener("click", function () { setPage('login') });
        var SignUpButton = document.getElementById("LogInToSignUpButton").addEventListener("click", function () { setPage('signup') });
    }
    if(page === 'signup'){
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
    if (page === 'login') {
      var eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function (event) {logIn(event) });   
      var eventLog = document.getElementById("LogInToSignUpButton").addEventListener("click", function (event) {setPage('signup') });  
      var eventClose = document.getElementsByClassName("closebtn")[0].addEventListener("click",function(){closeMessage()});
    }
    if(page === 'login' || page === 'signup'){
      let backButton = document.getElementById("backButton").addEventListener("click", function () { setPage('start') });
    }

    if(page === 'authorCite' || page === 'unknownCite'  || page === 'orgCite') {
      var backButton = document.getElementById("backButton").addEventListener("click", function (event) { setPage('cite') });
      var backButton = document.getElementById("citateButton").addEventListener("click", function (event) { resultsCitation(event, page) });
    }
    if(page === 'authorCite'){
      let authName = document.getElementById('authorName')
      let authorLastName = document.getElementById('authorLastName')
      let website = document.getElementById('websiteName')
      let webpage = document.getElementById('webpageName')
      let date = document.getElementById('dateOfPublication')

      let authorNameEvent = authName.addEventListener('input', function (){validateCitationA(date, authName, authorLastName, webpage, website)})
      let authorLastNameEvent = authorLastName.addEventListener('input', function (){validateCitationA(date, authName, authorLastName, webpage, website)})
      let websiteEvent = website.addEventListener('input', function (){validateCitationA(date, authName, authorLastName, webpage, website)})
      let webpageEvent = webpage.addEventListener('input', function (){validateCitationA(date, authName, authorLastName, webpage, website)})
      let dateEvent = date.addEventListener('change', function (){validateCitationA(date, authName, authorLastName, webpage, website)})
    }
    if(page === 'unknownCite'){
      let website = document.getElementById('websiteName')
      let webpage = document.getElementById('webpageName')
      let date = document.getElementById('dateOfPublication')


      let websiteEvent = website.addEventListener('input', function (){validateCitationU(date, webpage, website)})
      let webpageEvent = webpage.addEventListener('input', function (){validateCitationU(date, webpage, website)})
      let dateEvent = date.addEventListener('change', function (){validateCitationU(date, webpage, website)})
    }

    if(page === 'orgCite'){
      let orgName = document.getElementById('orgName')
      let website = document.getElementById('websiteName')
      let webpage = document.getElementById('webpageName')
      let date = document.getElementById('dateOfPublication')

      let organizationEvent = orgName.addEventListener('input', function (){validateCitationO(date, orgName, webpage, website)})
      let websiteEvent = website.addEventListener('input', function (){validateCitationO(date, orgName, webpage, website)})
      let webpageEvent = webpage.addEventListener('input', function (){validateCitationO(date, orgName, webpage, website)})
      let dateEvent = date.addEventListener('change', function (){validateCitationO(date, orgName, webpage, website)})
    }
    if(page === 'citeResults' ) {
      var backButton = document.getElementById("backButton").addEventListener("click", function (event) { setPage('cite') });
      let apaButton = document.getElementById("APAButton").addEventListener("click", function () { copyCitation('apaCitation')});
      let ieeeButton = document.getElementById("IEEEButton").addEventListener("click", function () { copyCitation('ieeeCitation')});
      let chicagoButton = document.getElementById("chicagoButton").addEventListener("click", function () { copyCitation('chicagoCitation')});
    }
    if (page === 'review' || page === 'pageinfo') {
      let backButton = document.getElementById("backButton").addEventListener("click", function () { setPage('home') });
    }

    if (page === 'review') {
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
    if(page === 'account' || page === 'home' || page === 'settings'){
      let menuHomeButton = document.getElementById("menuHomeButton").addEventListener("click", function () { setPage('home') });
      let menuAccountButton = document.getElementById("menuAccountButton").addEventListener("click", function () { setPage('account') });
      let menuSetttingsButton = document.getElementById("menuSetttingsButton").addEventListener("click", function () { setPage('settings') });
      
    }
    if (page === 'home'){
      let eventHomeCite = document.getElementById("HomeToCitateButton").addEventListener("click", function () { setPage('cite') });
      let eventHomePageInfo = document.getElementById("HomeToPageInfoButton").addEventListener("click", function () { setPage('pageinfo')});
      
    }
    if (page === 'cite'){
      let selectFormat = document.getElementById("citationFormatOpt")
      let FormatEvent = selectFormat.addEventListener('change', function (){validateChoice(selectFormat)})

      let eventHomePageInfo = document.getElementById("CitateToFormat").addEventListener("click", function () { citation()});
      let backButton = document.getElementById("backButton").addEventListener("click", function () { setPage('home') });
    }
    if(page === 'settings'){
      let LogOut = document.getElementById("logOutButton").addEventListener("click", function () { logOut() });
    }
    if(page == 'pageinfo'){
      loadInfo()
      let eventPageinfoReview = document.getElementById("PageinfoToReview").addEventListener("click", function () { setPage('review') });
    }


}

async function loadInfo(){
  latestUrl = await loadPageInfo()
}

function logOut(){
  Cookies.remove('token')
  setPage('start')
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

async function resultsCitation (event, state){
  if (state=="authorCite"){
    citationResults = await citeAuthor(event)
  }
  else if (state == "orgCite"){
    citationResults = await citeOrg(event)
  }
  else{
    citationResults = await citeUnknown(event)
  }
  setPage('citeResults')
  applyCitations(citationResults[0], citationResults[1], citationResults[2])
}



// TODO: Rendering, eventos, claseSurfi

