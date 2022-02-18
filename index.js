"use strict";
let items = null;


const removeTask = (e) => {
    const $task = e.currentTarget.closest('.j-task-element');
    items = items.filter((item) => item.id !== Number($task.id));
    localStorage.setItem('items', JSON.stringify(items));
    $task.remove();
};

const checkTask = (e) => {
    const $task = e.currentTarget.closest('.j-task-element');
    const $text = $task.querySelector('.j-input-text');

    if ($text.classList.contains('text-decoration')) {
        $text.classList.remove('text-decoration');

    } else {
        $text.classList.add('text-decoration');
    }

    items = items.map((item) => {

        if (item.id === Number($task.id)) {
            return {
                ...item,
                checked: !item.checked
            };
        }

        return item;

    });

    localStorage.setItem('items', JSON.stringify(items));
};

function bindEventListener(butonCheck, buttonRemove) {
    butonCheck.addEventListener('click', checkTask);
    buttonRemove.addEventListener('click', removeTask);
}

function removeEventListener(butonCheck, buttonRemove) {
    butonCheck.removeEventListener('click', checkTask);
    buttonRemove.removeEventListener('click', removeTask);
}


function bindEvents() {
    const $listItems = document.querySelectorAll('.j-task-element');

    $listItems.forEach((elem) => {
        const $butonCheck = elem.querySelector('.j-check-button');
        const $buttonRemove = elem.querySelector('.j-remove-button');

        removeEventListener($butonCheck, $buttonRemove);
        bindEventListener($butonCheck, $buttonRemove);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector(".new-task-form");
    const $input = document.querySelector(".new-task-input");
    const $time = document.querySelector(".start-date");

    items = JSON.parse(localStorage.getItem('items')) || [];

    items.forEach(element => addTask(element));
    bindEvents();

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = $input.value;
        let date = $time.value;

        if (!text || !date) {
            alert('Just fill all of the fields of the form and hit "Add task" button.');
            return;
        }
        addTask({
            text,
            date,
        });
        bindEvents();
        $input.value = '';
        $time.value = '';
    });
});


function renderTaskItem({
    id,
    text,
    date
}) {
    return (
        `<div class="task-element j-task-element" id="${id}">
        <div class="content">
            <div class="input-text j-input-text">${text}</div>
            <div class="press">
                <div class="start-date press-date">${date}</div>
                <label class="checked"><input class="j-check-button" type="checkbox">Success</label>
                <button class="remove j-remove-button">Delete</button>
            </div>
        </div>
    </div>`);
}


function addTask({
    id,
    text,
    date
}) {
    const $listContainer = document.querySelector("#tasks");
    const data = {
        id: id || (new Date()).getTime(),
        text,
        date: new Date(date).toDateString(),
        checked: false
    };

    $listContainer.insertAdjacentHTML('beforeend', renderTaskItem(data));

    if (!items.find((item) => item.id === data.id)) {
        items.push(data);
        localStorage.setItem('items', JSON.stringify(items));
    }
}