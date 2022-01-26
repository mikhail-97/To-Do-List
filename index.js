"use strict";
const items = JSON.parse(localStorage.getItem('items'));
window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector(".new-task-form");
    const input = document.querySelector(".new-task-input");
    items.forEach(element => {
        addTask(element.tasks);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const tasks = input.value;

        if (!tasks) {
            alert('Mishail Francis Drake Jr., Sr., you cannot be free from work !!!');
            return;
        }
        addTask(tasks);
    });
});

function addTask(tasks) {
    const list_elem = document.querySelector("#tasks");

    const task_el = document.createElement("div");
    task_el.classList.add("task-element");

    const content_elem = document.createElement("div");
    content_elem.classList.add("content");

    task_el.appendChild(content_elem);
    list_elem.appendChild(task_el);

    const input_new_el = document.createElement("div");
    input_new_el.classList.add("input-text");
    input_new_el.innerText = tasks;

    content_elem.appendChild(input_new_el);

    const press = document.createElement("div");
    press.classList.add("press");

    content_elem.appendChild(press);

    const task_checked = document.createElement("button");
    task_checked.classList.add("checked");
    task_checked.innerHTML = "Checked";

    const task_remove = document.createElement("button");
    task_remove.classList.add("remove");
    task_remove.innerHTML = "Remove";

    press.appendChild(task_checked);
    press.appendChild(task_remove);

    task_checked.addEventListener('click', () => {
        task_checked.classList.add("active");
        input_new_el.classList.add("text-decoration");
        input_new_el.setAttribute("readonly", "readonly");
    });

    task_remove.addEventListener('click', () => {
        list_elem.removeChild(task_el);
    });

    const new_task = input_new_el.innerText;
    const newObj = {
        tasks: new_task
    };
    items.push(newObj);
    localStorage.setItem('items', JSON.stringify(items));
}