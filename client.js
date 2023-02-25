import { FXMLhttpRequest } from "./network/fxmlhttprequest.js";
var logged_user = {username: "", password: "", id : "", fname : "", lname : ""}


document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', sign_in_page);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', sign_up_page);
document.getElementById('FormSubmit_Click').addEventListener('click', handleFormSubmit);
var presented_tasks = {};

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

            exit_login_page();
            exit_signup_page();
            console.log('log in success, loading tasks...');
            load_todo_list();
        }
    });
    req.send();
}

function sign_in_page(){
    load_login_page();
    exit_signup_page();
}

function sign_up(){
    // get password and username from login form
    var userElement = document.getElementById("SignUpUsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("SignUpPasswordText");
    var user_password = passElement.value;
    var fnameElement = document.getElementById("SignUpFNameText");
    var user_fname = fnameElement.value;
    var lnameElement = document.getElementById("SignUpLNameText");
    var user_lname = lnameElement.value;

    var req = new FXMLhttpRequest();
    req.open(
        'PUT',
        'server.com/SignUp',
        {username : user_username, password : user_password, fname : user_fname, lname : user_lname},
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
                exit_login_page();
                exit_signup_page();
                console.log('sign up success, loading tasks...');
                load_todo_list();
            }
        }
    );
    req.send();
}

function sign_up_page(){
    load_signup_page();
    exit_login_page();
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
                const check_box = task_item.querySelector('.check-box');
                check_box.setAttribute('task-id', task.id);
                check_box.checked = task.done;
                check_box.addEventListener('change', delete_task);
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

function load_login_page(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.remove('hide');
    taskTemplate.classList.remove('hidden');
}

function exit_login_page(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('hide');
    taskTemplate.classList.add('hidden');
}

function load_signup_page(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.remove('hide');
    taskTemplate.classList.remove('hidden');
}

function exit_signup_page(){
    const taskTemplate = document.getElementById('signup-form');
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
            task = response.task;
            const tasksList = document.getElementById('task-list');
            const taskTemplate = document.getElementById('task-template');
            const task_item = taskTemplate.content.cloneNode(true);
            const span = task_item.querySelector('span');
            span.textContent = text;
            const check_box = task_item.querySelector('.check-box');
            check_box.setAttribute('task-id', task.id);
            check_box.addEventListener('change', delete_task);
            tasksList.appendChild(task_item);
            
        }
    });
    req.send();
}

function delete_task(event){
    var check_box = this
    if(this.checked){
        // hide task
        // Create a request to delete the task
        var req = new FXMLhttpRequest();
        req.open(
            'DELETE',
            'server.com/DeleteTask',
            { taskId : this.getAttribute('task-id')},
            function(response) {
                console.log(response.status)
                if (response.status === 200){
                    check_box.parentElement.remove();
                }
            });
        req.send();
    }
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