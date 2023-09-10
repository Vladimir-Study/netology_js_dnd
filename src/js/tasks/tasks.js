export default class Tasks {
  addTask(parentElement, text) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.draggable = true;
    task.textContent = text;
    parentElement.append(task);
  }

  addCloseIcon(parentElement) {
    const closeIcon = document.createElement('span');
    closeIcon.textContent = '\u00D7';
    closeIcon.classList.add('close-icon');
    parentElement.append(closeIcon);
  }
}
