//Globals
let todos = ['ccc', 'ccc'];
let users = [];

const list = document.getElementById('todo-list');


//Attach event 
document.addEventListener('DOMContentLoaded', initApp);

//Basic logic
function getUserName(userId) {
    const user = users.find(user => user.id === userId);
    return user.name;
}

function printTodo({id, userId, title, completed}) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${title} <i>ОТ</i> ${getUserName(userId)}</span>`;
    list.prepend(li)
} 



//Event logic
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then(values => {
        [todos, users] = values;
        todos.forEach(todo => printTodo(todo))
    });
}



// Async logic

async function getAllTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    return data;
}


async function getAllUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    return data;
}