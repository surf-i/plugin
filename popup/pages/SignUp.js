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
            <div class="SignInComponent_container" id="SignUpForm">
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <form
                class="SignInComponent_form"
                >
                ${UserInput({ id: 'firstNameComp',title: 'First Name', type: "text", name:'firstname' })}
                ${UserInput({ id: 'lastNameComp',title: 'Last Name', type: "text", name:'lastname' })}
                ${UserInput({ id: 'emailComp',title: 'Email', type: "email", name:'email' })}
                ${UserInput({ id: 'usernameComp',title: 'Username', type: "text", name:'username' })}
                ${UserInput({ id: 'passwordComp',title: 'Password', type: "password", name:'password' })}
                ${UserInput({ id: 'passwordVerifComp',title: 'Confirm Your Password', type: "password", name:'passwordVerif' })}   
                <button 
                    disabled
                    class="sign_in_btn"
                    id="SignUpToHomeButton"
                    type="submit"
                >
                    Sign Up
                </button>
                </form>
            </div>
        </div>
        `
    )
}

// disabled=${!validateForm()}

async function signUpFunction(e) {
    e.preventDefault()
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
                password2: passwordVerif.value,
                first_name: firstname.value,
                last_name: lastname.value
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
function validateForm(email, username, password, password2, firstname, lastname){
    let a = (email.value.length > 0 && 
            username.value.length > 5 && 
            password.value.length > 8 && 
            verifyPassword(password, password2) && 
            validateEmail(email) &&
            firstname.value.length >0 &&
            lastname.value.length >0
            )

    document.getElementById('SignUpToHomeButton').disabled = !a;
}

export { SignUpTemplate, signUpFunction, validateForm} 