//Globals
let todos = [];
let users = [];

const list = document.getElementById('todo-list');
const selector = document.getElementById('user-todo');
const form = document.getElementById('form');


//Attach event 
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);

//Basic logic
function getUserName(id) {
    const user = users.find(user => user.id === id);
    return user.country;
}

function printTodo({ id, name, completed }) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${name} ОТ <b>${getUserName(id)}</b></span>`;

    const status = document.createElement('input');
    status.type = 'checkbox';
    status.checked = completed;

    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'X';
    delBtn.className = 'close';

    list.prepend(li);
    li.prepend(status);
    li.append(delBtn);
}

function createUserOption(user) {

    const option = document.createElement('option');
    option.value = user.id;
    option.innerText = user.name;

    selector.append(option);
}

//Event logic
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then(values => {
        [todos, users] = values;
        console.log(todos, users)
        todos.forEach(todo => printTodo(todo));
        users.forEach(user => createUserOption(user))
    });
}

function handleSubmit(event) {
    event.preventDefault();
    console.log(form.todo.value);

    createTodo({
        name: form.todo.value,
        completed: false
    });
}

// Async logic

async function getAllTodos() {
    const response = await fetch('https://fake-json-api.mock.beeceptor.com/companies');
    const data = await response.json();

    return data;
}


async function getAllUsers() {
    const response = await fetch('https://fake-json-api.mock.beeceptor.com/users');
    const data = await response.json();

    return data;
}

async function createTodo(todo) {
    const response = await fetch('https://fake-json-api.mock.beeceptor.com/companies', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    printTodo({id: crypto.randomUUID(), ...todo});
}