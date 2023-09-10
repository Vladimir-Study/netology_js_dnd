// TODO: write code here
import Tasks from './tasks/tasks';

const canvas = document.querySelector('.canvas');

const boards = document.querySelectorAll('.board');
const tasks = new Tasks();
const addTask = document.querySelectorAll('.add-task-link');
const addFormBtn = document.querySelectorAll('.add-task-form-btn');
let actualAddBtn;
let actualForm;
let actualFormInput;
let boardName;
let currentDropTask;

canvas.addEventListener('click', (e) => {
  if (Array.from(addTask).includes(e.target)) {
    boardName = e.target.parentElement.previousElementSibling;
    actualAddBtn = e.target;
    actualAddBtn.classList.add('hide-elem');
    actualForm = e.target.nextElementSibling;
    actualForm.classList.remove('hide-elem');
    addTask.forEach((elem) => {
      if (elem !== actualAddBtn) {
        elem.nextElementSibling.classList.add('hide-elem');
        elem.classList.remove('hide-elem');
      }
    });
  }
});

canvas.addEventListener('mouseover', (e) => {
  if (e.target.className === 'task') {
    tasks.addCloseIcon(e.target);
  }
});

canvas.addEventListener('mouseout', (e) => {
  if (e.target.className === 'task') {
    e.target.removeChild(e.target.firstElementChild);
  }
});

canvas.addEventListener('click', (e) => {
  if (Array.from(addFormBtn).includes(e.target)) {
    actualFormInput = e.target.previousElementSibling;
    tasks.addTask(boardName, actualFormInput.value);
    actualForm.classList.add('hide-elem');
    actualAddBtn.classList.remove('hide-elem');
    actualFormInput.value = '';
  }
});

canvas.addEventListener('click', (e) => {
  if (e.target.className === 'close-icon') {
    const currentTask = e.target.parentElement;
    const currentBoard = currentTask.parentElement;
    currentBoard.removeChild(currentTask);
  }
});

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  this.childNodes[3].append(currentDropTask);
}

boards.forEach((board) => {
  board.addEventListener('dragover', dragOver);
  board.addEventListener('drop', dragDrop);
});

function drag(event) {
  event.dataTransfer.setData('target', event.target);
}

canvas.addEventListener('mouseover', (e) => {
  if (e.target.className === 'task') {
    currentDropTask = e.target;
    currentDropTask.addEventListener('dragstart', (event) => {
      drag(event);
    });
  }
});
