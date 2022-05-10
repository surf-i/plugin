// sets a unified javascript to import pages
import Cookies from '../../lib/js.cookie.mjs'
import { Surfen } from '../../scripts/core.mjs'
import { Start } from '../pages/Start.js'
import { LogIn, loginFunction } from '../pages/LogIn.js'
import { Review } from '../pages/Review.js'
import { SignUpTemplate, signUpFunction, validateForm } from '../pages/SignUp.js'
import { Home } from '../pages/Home.js'
import { Account } from '../pages/Account.js'
import { PageInfo } from '../pages/PageInfo.js'
import { Settings } from '../pages/Settings.js'


const body = document.body
var url = 'https://44.195.183.116/'


const Log = new LogIn()

const routes = {
    "start": Start,
    "login": LogIn,
    "review": Review,
    "home": Home,
    "account": Account,
    "pageinfo": PageInfo,
    "settings": Settings
}

//sets the sate of the app
if(Cookies.get('state') == undefined){
  Cookies.set('before', 'start')
}
Cookies.set('state', 'start')
var [state, before] = [Cookies.get('state'), Cookies.set('before')]
var token = Cookies.get('token')

setPage(state)

// var page = document.getElementById()

function setPage(state) {
  let component = new routes[state]()
  Surfen.addComponent(component, document.getElementById('popup'))
}

async function logIn(event){
  let logInToken = await loginFunction(event)
  if(logInToken != null){
    Cookies.set('token', logInToken)
    setPage('home')
  }else{
    console.error("error logIn")
  }
}

async function signUp(event){
  let logInToken = await signUpFunction(event)
  if(logInToken != null){
    Cookies.set('token', logInToken)
    setPage('home')
  }else{
    console.error("error signUp")
  }
}

// TODO: Rendering, eventos, claseSurfi