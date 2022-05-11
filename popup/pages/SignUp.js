import { Component, Surfen } from "../../scripts/core.mjs";
import UserInput from "../components/UserInput.js"
import { Start } from "./start.js";
var url = 'http://44.195.183.116/'

class SignUp extends Component{
    initialize(){
        this.html`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>
            <h2 class="title">SignUp</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="SignUpForm">
                <form
                class="SignInComponent_form"
                >
                ${new UserInput({ id: 'emailComp',title: 'Email', type: "email", name:'email' })}
                ${new UserInput({ id: 'usernameComp',title: 'Username', type: "text", name:'username' })}
                ${new UserInput({ id: 'passwordComp',title: 'Password', type: "password", name:'password' })}
                ${new UserInput({ id: 'passwordVerifComp',title: 'Password verification', type: "password", name:'passwordVerif' })}   
                </form>
                <button
                    disabled 
                    class="sign_in_btn"
                    id="SignUpToHomeButton"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </div>
        `
    }
    render(){
        this.addEvent('backButton','click', Surfen.navegate, [this, new Start()])

    }
}

// disabled=${!validateForm()}

async function signUpFunction(e) {
    // e.preventDefault()
    const response = await fetch(url+'dj-rest-auth/registration/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
                username: username.value,
                email: email.value,
                password1: password.value,
                password2: passwordVerif.value
            }) // body data type must match "Content-Type" header
        });
        let res = await response.json() 
        return res?.key  
}


function verifyPassword(password, passwordVerif){
    return (password.value === passwordVerif.value) 
}
function validateEmail(email){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email.value); 
  } 
function validateForm(email, username, password, password2){
    let a = email.value.length > 0 && username.value.length > 5 && password.value.length > 8 && verifyPassword(password, password2) && validateEmail(email)
    document.getElementById('SignUpToHomeButton').disabled = !a;
}

export { SignUp, signUpFunction, validateForm} 