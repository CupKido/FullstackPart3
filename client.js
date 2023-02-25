import { FXMLhttpRequest } from "./network/fxmlhttprequest.js";
var logged_user = {username: "", password: "", id : "", fname : "", lname : ""}


document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('FormSubmit_Click').addEventListener('click', handleFormSubmit);


function test(){
    var req = new FXMLhttpRequest();
    req.open(
     'PUT',
     'server.com/SignUp',
     {username : 'saar', password : '1234', fname : 'saar', lname : 'taler'},
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
        if (response.status === 200){
            var tasks = response.tasks;
            // add tasks to todo list
            const tasksList = document.getElementById('task-list');
            const taskTemplate = document.getElementById('task-template');
            console.log('title', tasks)
            for (const task of tasks){
                console.log(task.title);
                const task_item = taskTemplate.content.cloneNode(true);
                const span = task_item.querySelector('span');
                span.textContent = task.title;
                tasksList.appendChild(task_item);
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

test();

// Function to add a new task to the list
function addTask(text) {
    


    var req = new FXMLhttpRequest();
    req.open(
     'PUT',
     'server.com/CreateTask',
     {userId : logged_user.id, title : text},
     function(response) {
        console.log(response.status)
        if (response.status === 200){
            const tasksList = document.getElementById('task-list');
            const taskTemplate = document.getElementById('task-template');
            const task = taskTemplate.content.cloneNode(true);
            const span = task.querySelector('span');
            span.textContent = text;
            tasksList.appendChild(task);
        }
    });
    req.send();
}

// Function to handle form submission
function handleFormSubmit(event) {
    //event.preventDefault();
    const inputText = document.getElementById('task-text');
    const text = inputText.value;
    if (text !== '') {
        addTask(text);
        inputText.value = '';
    }
}