const btn = document.querySelector('.btn');
const inpBody = document.querySelector('#input-body');
const list = document.querySelector('.list');

btn.addEventListener('click', handleClick);
document.addEventListener('keydown', handleEnter);

function handleEnter (event) {
    if (event.key === 'Enter') {
        handleClick ();  
    }
}

function handleClick () {
    if (inpBody.value.trim()) {
        addTask(inpBody.value.trim());
       inpBody.value = '';
    }
}

function addTask (text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    span.textContent = text;
    delBtn.textContent = "Х";
    list.append(li);
    li.classList.add('li-tasker');
    span.classList.add('span-tasker');
    delBtn.classList.add('del-btn');
    li.appendChild(span);
    li.appendChild(delBtn);
    span.addEventListener('click', spanDone);
    delBtn.addEventListener('click', () => {
        li.remove();
    });
}

function spanDone () {
    this.closest('li').classList.toggle('done');
}
