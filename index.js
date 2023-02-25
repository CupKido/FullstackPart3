const taskList = document.querySelector('ul');
const taskTemplate = document.getElementById('task-template');
const inputText = document.getElementById('task-text');

// Function to add a new task to the list
function addTask(text) {
    const task = taskTemplate.content.cloneNode(true);
    const span = task.querySelector('span');
    span.textContent = text;
    taskList.appendChild(task);
}

// Function to handle form submission
function handleFormSubmit(event) {
    //event.preventDefault();
    const text = inputText.value;
    if (text !== '') {
        addTask(text);
        inputText.value = '';
    }
}