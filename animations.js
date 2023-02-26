var loginPageBottun = document.getElementById("Login")
var SignUpPageBottun = document.getElementById("Sign-Up")
var backBottuns = document.getElementsByClassName('back')

loginPageBottun.onclick = function(event){
    this.parentElement.className = 'hidden'
    document.getElementById('login').className = ''
}

SignUpPageBottun.onclick = function(event){
    this.parentElement.className = 'hidden'
    document.getElementById('sign-up').className = ''
}

for (var backBottun of backBottuns){
    backBottun.onclick = function(event){
        this.parentElement.className = 'hidden'
        document.getElementById('login-signup').className = ''
    }
}