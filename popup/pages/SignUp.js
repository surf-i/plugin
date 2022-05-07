import UserInput from "../components/UserInput.js"
var url = 'http://44.195.183.116/'

function SignUpTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>
            <h2 class="title">SignUp</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="SignInComponent_container" id="Form">
                <form
                class="SignInComponent_form"
                onsubmit="handleSubmit"
                >
                ${UserInput({ id: 'emailComp', idInput: 'email', title: 'Email', type: "email", name:'email' })}
                ${UserInput({ id: 'usernameComp', idInput: 'username', title: 'Username', type: "text", name:'username' })}
                ${UserInput({ id: 'passwordComp', idInput: 'password', title: 'Password', type: "password", name:'password' })}
                ${UserInput({ id: 'passwordVerifComp', idInput: 'passwordVerif', title: 'Password verification', type: "password", name:'passwordVerif' })}
                <button 
                    
                    class="sign_in_btn"
                    id="SignUpToStartButton"
                >
                    SignUp
                </button>
                </form>
            </div>
        </div>
        `
    )
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
            username: username,
            email: email,
            password1: password.value,
            password2: passwordVerif.value
        }) // body data type must match "Content-Type" header
        });
        let res = await response.json() 
        return res?.key  
}


function verifyPassword(){
    return (password.value === passwordVerif.value) 
}
function validateEmail(){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
  } 
function validateForm(){
    return (verifyPassword() && validateEmail() && email.value.length>0 && username.value.length>5 && password.value.length>8)
}

export { SignUpTemplate, signUpFunction} 