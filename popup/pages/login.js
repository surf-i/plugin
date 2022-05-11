import Cookies from "../../lib/js.cookie.mjs"
import { Component, Surfen } from "../../scripts/core.mjs"
import UserInput from "../components/UserInput.js"
import { Start } from "./start.js"
var url = 'https://44.195.183.116/'

class LogIn extends Component{
    initialize(){
        this.html`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Login</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" >
                <form class="SignInComponent_form" id="LogInForm">
                ${new UserInput({ id: 'userInputEmail',title: 'Username or Email', type: "text", name:"username" })}
                ${new UserInput({ id: 'userInputPassword',title: 'Password', type: "password", name:"password" })}
                <button
                    class="sign_in_btn"
                    id="LogInToStartButton"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
                <button class="SignInComponent_SingUp" id="LogInToSignUpButton">Sign Up</button>
            </div>
        </div>
        `
    }
    render(){
        this.addEvent('backButton','click', Surfen.navegate, [this, new Start()])
        this.addEvent('LogInToStartButton', 'click', logIn)
    }
    // eventLog = document.getElementById("LogInToStartButton").addEventListener("click", function (event) {logIn(event) });   
    // eventLog = document.getElementById("LogInToSignUpButton").addEventListener("click", function (event) {setPage('signup') });   
}
function validateEmail(email){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email.value); 
} 
async function logIn(){
    let logInToken = await loginFunction()
    if(logInToken != null){
      Cookies.set('token', logInToken)
    }else{
      console.error("error logIn")
    }
}
async function loginFunction() {
    let [usernamePost, emailPost] = verifyEmail(username)
    const response = await fetch(url+'dj-rest-auth/login/', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
          username: usernamePost,
          email: emailPost,
          password: password.value
      }) // body data type must match "Content-Type" header
    });
    let res = await response.json() 
    return res?.key
}
function verifyEmail(username){
    let [usernamePost, emailPost] = ["", ""]
    if (validateEmail(emailPost)) 
    {
        emailPost = username.value
    }
    else
    {
        usernamePost = username.value
    }
    return [usernamePost, emailPost]
}
export { LogIn}