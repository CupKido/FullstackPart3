var loginPageBottun = document.getElementById("Login")
var SignUpPageBottun = document.getElementById("Sign-Up")
var backBottuns = document.getElementsByClassName('back')

function changeScreen(element,showId,newHeight){
    element.parentElement.className = ''
    document.getElementById(showId).className = 'display-section'
    document.getElementById('content-div').style.height = newHeight
}

loginPageBottun.onclick = function(event){
    changeScreen(this, 'login','400px')
}

SignUpPageBottun.onclick = function(event){
    changeScreen(this, 'sign-up','430px')
}

for (var backBottun of backBottuns){
    backBottun.onclick = function(event){
        changeScreen(this, 'login-signup','370px')

    }
}