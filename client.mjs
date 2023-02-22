import { FXMLhttpRequest } from "./network/fxmlhttprequest.mjs";
var logged_user = {username: "", password: "", id : "", fname : "", lname : ""}


document.getElementById('LogInButton').addEventListener('click', sign_in);

function test(){
    var req = new FXMLhttpRequest();
    req.open(
     'PUT',
     'server.com/CreateTask',
     {title: 'Make third fullstack project', description : 'Annoy Avishay to death', userId : logged_user.id},
     function(response) {
        console.log('client from server.com says: ', response);
    });
    req.send();
}

// attach event listener to login button


function sign_in(){ 
    // get password and username from login form
    var userElement = document.getElementById("UsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("PasswordText");
    var user_password = passElement.value;

    var req = new FXMLhttpRequest();
    req.open(
     'GET',
     'server.com/SignIn',
     {username : user_username, password : user_password},
     function(response) {
        console.log(response)
        if (response.status === 200){
            
            var user = response.user;
            logged_user = {
                username : user.username,
                password: user.password,
                id : user.id,
                fname : user.fname,
                lname : user.lname
            };

            exit_login();
            console.log('log in success, loading tasks...');
            load_todo_list();
        }
    });
    req.send();
}

function load_todo_list(){
    var req = new FXMLhttpRequest();
    req.open(
     'GET',
     'server.com/GetTasks',
     {userId : logged_user.id},
     function(response) {
        console.log(response.status)
        if (response.status === 200){
            var tasks = response.tasks;
            // add tasks to todo list
            const tasksList = document.getElementById('task-list');
            const taskTemplate = document.getElementById('task-template');
            for (var i = 0; i < tasks.length; i++){
                var task_data = tasks[i];
                console.log(task_data.title);
                const task = taskTemplate.content.cloneNode(true);
                const span = task.querySelector('span');
                span.textContent = task_data.title;
                tasksList.appendChild(task);
            }


            // remove hide class from todo list
            const taskDiv = document.getElementById('ToDoListApp');
            taskDiv.classList.remove('hide');
            taskDiv.classList.remove('hidden');
        }
    });
    req.send();
}

function exit_login(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('hide');
    taskTemplate.classList.add('hidden');
}