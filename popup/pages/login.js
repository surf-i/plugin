import UserInput from "../components/UserInput.js"
var url = 'http://44.195.183.116/'

function LoginTemplate(object) {
    return (
        /*html*/`
        <div class="SurfiComponent page-container"> 
            <button id="backButton">
                <span class="material-icons">arrow_back_ios</span>
            </button>   
            <h2 class="title">Login</h2>
            <!-- <img src="../../assets/logo/round_logo.png" class="logo" alt="Surfi Logo"> -->
            <div class="alert" id="alertaCredenciales">
                    <span class="closebtn">&times;</span>  
                    <strong>We Are Sorry</strong> but your log in credentials are incorrect :(
                </div>
            <div class="SignInComponent_container" id="LogInForm">
                <form
                class="SignInComponent_form"
                >
                
                ${UserInput({ id: 'userInputEmail',title: 'Username or Email', type: "text", name:"username" })}
                ${UserInput({ id: 'userInputPassword',title: 'Password', type: "password", name:"password" })}
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
    )
}

let LoginEvents = [
    {

    }
]

async function loginFunction(e) {
    e.preventDefault()
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
    return res
}
function verifyEmail(username){
    let [usernamePost, emailPost] = ["", ""]
    if (username.value.includes("@") && username.value.includes(".")) 
    {
        emailPost = username.value
    }
    else
    {
        usernamePost = username.value
    }
    return [usernamePost, emailPost]
    
}

function errorMessage(){
    var alert = document.getElementById("alertaCredenciales");
    alert.style.opacity = "1";
    setTimeout(function(){ alert.style.display = "flex"; }, 600);
}

function closeMessage(){
    var close = document.getElementsByClassName("closebtn");
    var div = close[0].parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
}
export { LoginTemplate , loginFunction, closeMessage, errorMessage }