import { FXMLhttpRequest } from "./network/fxmlhttprequest.js";
var logged_user = {username: "", password: "", id : "", fname : "", lname : ""}


document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', sign_in_page);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', sign_up_page);
document.getElementById('FormSubmit_Click').addEventListener('click', handleFormSubmit);
document.getElementById('LogOutButton').addEventListener('click', logout);

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


function show_error(label,errorMessage){
    const error = document.getElementById(`${label}ErrorLabel`);
    error.textContent = errorMessage;
    error.classList.remove('hidden');
    setTimeout(()=>{document.getElementById(`${label}ErrorLabel`).classList.add('hidden');}, 2000);
}

function sign_in(event){ 
    // get password and username from login form
    var userElement = document.getElementById("UsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("PasswordText");
    var user_password = passElement.value;


    if (user_username === '' || user_password ===''){
        show_error('Login','please enter both username and password!');
        return
    }
    console.log('client: requesting specified user data...')
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

            console.log('client: log in success, loading tasks...');
            load_todo_list();
        }
        else{
            console.log('client: Error, user data invalid')
            show_error('Login','username or password is incorrect!');

        }

    });
    req.send();
}

function sign_in_page(){
    load_login_page();
    exit_signup_page();
}

function sign_up(){
    console.log('enter signup')
    // get password and username from login form
    var userElement = document.getElementById("SignUpUsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("SignUpPasswordText");
    var user_password = passElement.value;
    var fnameElement = document.getElementById("SignUpFNameText");
    var user_fname = fnameElement.value;
    var lnameElement = document.getElementById("SignUpLNameText");
    var user_lname = lnameElement.value;

    console.log(user_username,user_password,user_fname,user_lname)
    if (user_username === '' || user_password === '' || user_fname === '' || user_lname === ''){
        show_error('Signup','please fill all fields!')
        return
    }

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
                
                console.log('client: sign up success, loading tasks...');
                load_todo_list();
            }   
            else{
                show_error('Signup','username already exists!')
            }
    
        }
    );
    req.send();
}

function sign_up_page(){
    load_signup_page();
    exit_login_page();
}

function clear_fields(){
    const inputFields = document.getElementsByClassName('input-button')

    for (const inputField of inputFields){
        inputField.value = ''
    }
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
            
            console.log('tasks: ', tasks)
            for (const task of tasks){
                if( task.done)
                {
                    addCompletedTask(task);
                }
                else
                {
                    addTask(task);
                }
            }
            clear_fields();

            const taskDiv = document.getElementById('ToDoListApp');
            taskDiv.classList.remove('hidden');
            document.getElementsByClassName('form')[0].classList.add('hidden');
            document.getElementsByTagName('body')[0].style.background = 'rgb(241, 241, 241)';
        }
    });
    req.send();
}

function logout(event){
    // remove all tasks from todo list
    const tasksList = document.getElementById('task-list');
    // get all li elements
    const tasks = tasksList.querySelectorAll('li');
    // delete all li elements
    tasks.forEach(task => {
        tasksList.removeChild(task);
    });
    
    // remove all tasks from completed list
    const completedList = document.getElementById('completed-task-list');
    // get all li elements
    const completed = completedList.querySelectorAll('li');
    // delete all li elements
    completed.forEach(task => {
        completedList.removeChild(task);
    });

    // add hide class to todo list
    const taskDiv = document.getElementById('ToDoListApp');
    taskDiv.classList.add('hidden');
    document.getElementsByClassName('form')[0].classList.remove('hidden');
    document.getElementsByTagName('body')[0].style.background = 'radial-gradient(#39a245,#1f1013)';


    logged_user = {username: "", password: "", id : "", fname : "", lname : ""}
    exit_signup_page();
    load_login_page();
}

function load_login_page(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('display-section');
    taskTemplate.classList.remove('area');
}

function exit_login_page(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('area');
    taskTemplate.classList.remove('display-section');
}

function load_signup_page(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.add('display-section');
    taskTemplate.classList.remove('area');
}

function exit_signup_page(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.add('area');
    taskTemplate.classList.remove('display-section');
}

//test();

// Function to add a new task to the list
function addNewTask(text) {
    var req = new FXMLhttpRequest();
    req.open(
     'PUT',
     'server.com/CreateTask',
     {userId : logged_user.id, title : text},
     function(response) {
        console.log(response)
        if (response.status === 200){
            var task = response.task;
            addTask(task);
        }
    });
    req.send();
}

function addTask(task){
    const tasksList = document.getElementById('task-list');
    const taskTemplate = document.getElementById('task-template');
    const task_item = taskTemplate.content.cloneNode(true);
    const span = task_item.querySelector('span');
    span.textContent = task.title;
    const check_box = task_item.querySelector('.check-box');
    check_box.setAttribute('task-id', task.id);
    check_box.checked = false;
    check_box.addEventListener('change', CheckBox_change);
    tasksList.appendChild(task_item);
}

function addCompletedTask(task){
    const tasksList = document.getElementById('completed-task-list');
    const taskTemplate = document.getElementById('task-template');
    const task_item = taskTemplate.content.cloneNode(true);
    const span = task_item.querySelector('span');
    span.textContent = task.title;
    const check_box = task_item.querySelector('.check-box');
    check_box.setAttribute('task-id', task.id);
    check_box.checked = true;
    check_box.addEventListener('change', CheckBox_change);
    tasksList.appendChild(task_item);
}

function CompletedTask(element) {
    const tasksList = document.getElementById('completed-task-list');
    tasksList.appendChild(element);
}

function RestoreTask(element) {
    const tasksList = document.getElementById('task-list');
    tasksList.appendChild(element);
}

function CheckBox_change(event){
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
                    CompletedTask(check_box.parentElement);                    
                }
            });
        req.send();
    }
    else{
        var req = new FXMLhttpRequest();
        req.open(
            'POST',
            'server.com/RestoreTask',
            { taskId : this.getAttribute('task-id')},
            function(response) {
                console.log(response.status)
                if (response.status === 200){
                    RestoreTask(check_box.parentElement);
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
        addNewTask(text);
        inputText.value = '';
    }
}