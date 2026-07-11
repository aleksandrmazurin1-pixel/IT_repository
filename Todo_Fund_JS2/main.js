//Globals
let todos = [];
let users = [];

const list = document.getElementById('todo-list');


//Attach event 
document.addEventListener('DOMContentLoaded', initApp);

//Basic logic
function getUserName(id) {
    const user = users.find(user => user.id === id);
    return user.country;
}

function printTodo({id, name, completed}) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${name} ОТ <b>${getUserName(id)}</b></span>`;

    const status = document.createElement('input');
    status.type = 'checkbox';
    status.checked = completed;

    //const delBtn = 


    list.prepend(li);
    li.prepend(status);
} 



//Event logic
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then(values => {
        [todos, users] = values;
        console.log(todos, users)
        todos.forEach(todo => printTodo(todo))
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