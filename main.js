/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/tasks/tasks.js
class Board {
  addBoard(parentElement, text) {
    const board = document.createElement('div');
    board.classList.add('board-item');
    board.draggable = true;
    const boardContent = document.createElement('div');
    board.append(boardContent);
    boardContent.classList.add('board-item-content');
    boardContent.textContent = text;
    parentElement.append(board);
  }
  addCloseIcon(parentElement) {
    const closeIcon = document.createElement('span');
    closeIcon.textContent = '\u2718';
    closeIcon.classList.add('close-icon');
    parentElement.append(closeIcon);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js
// TODO: write code here
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */

const board = new Board();
const addBtnAll = document.querySelectorAll('.board-add-btn');
let currentDroppable = null;
let placeholder;
let isDraggingStarted = false;
let movingElement;
let closeIcon;
for (const addBtn of addBtnAll) {
  addBtn.addEventListener('click', event => {
    const previousBoard = event.target.previousElementSibling;
    const insertText = previousBoard.value;
    const boardColumn = event.target.parentNode.previousElementSibling;
    board.addBoard(boardColumn, insertText);
    previousBoard.value = null;
  });
}
const initialMovingElementPageXY = {
  x: 0,
  y: 0,
  set: movingElement => {
    const rect = movingElement.getBoundingClientRect();
    initialMovingElementPageXY.x = rect.x + window.scrollX;
    initialMovingElementPageXY.y = rect.y + window.scrollY;
  }
};
const shifts = {
  shiftX: 0,
  shiftY: 0,
  set: (clientX, clientY, movingElement) => {
    shifts.shiftX = clientX - movingElement.getBoundingClientRect().left;
    shifts.shiftY = clientY - movingElement.getBoundingClientRect().top;
  }
};
const moveAt = (element, pageX, pageY) => {
  element.style.transform = `translate(${pageX - initialMovingElementPageXY.x - shifts.shiftX}px, ${pageY - initialMovingElementPageXY.y - shifts.shiftY}px) rotate(-3deg)`;
};
const getElementCoordinates = (node, searchCoordsBy) => {
  const rect = node.getBoundingClientRect();
  return {
    top: searchCoordsBy === 'by-center' ? rect.top + rect.height / 2 : rect.top + 10,
    left: rect.left + rect.width / 2
  };
};
const isAbove = (nodeA, nodeB) => {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();
  return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

// const isRight = (nodeA, nodeB) => {
//   const rectA = nodeA.getBoundingClientRect();
//   const rectB = nodeB.getBoundingClientRect();

//   return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
// };

const getElementBelow = (movingElement, searchCoordsBy) => {
  const movingElementCenter = getElementCoordinates(movingElement, searchCoordsBy);
  movingElement.hidden = true;
  const elementBelow = document.elementFromPoint(movingElementCenter.left, movingElementCenter.top);
  movingElement.hidden = false;
  return elementBelow;
};
const processEmptySections = () => {
  document.querySelectorAll('.board-column-content-wrapper').forEach(section => {
    if (!section.querySelector('.board-item:not(.emptySectionHiddenLesson)')) {
      const emptySectionHiddenLesson = document.createElement('div');
      emptySectionHiddenLesson.classList.add('board-item', 'emptySectionHiddenLesson');
      section.append(emptySectionHiddenLesson);
    } else {
      const emptySectionHiddenLesson = section.querySelector('.emptySectionHiddenLesson');
      emptySectionHiddenLesson && section.removeChild(emptySectionHiddenLesson);
    }
  });
};
const createPlaceholder = () => {
  placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  movingElement.parentNode.insertBefore(placeholder, movingElement);
};
const onMouseMove = event => {
  if (!isDraggingStarted) {
    isDraggingStarted = true;
    createPlaceholder();
    Object.assign(movingElement.style, {
      position: 'absolute',
      zIndex: 1000,
      left: `${initialMovingElementPageXY.x}px`,
      top: `${initialMovingElementPageXY.y}px`
    });
  }
  moveAt(movingElement, event.pageX, event.pageY);
  const elementBelow = getElementBelow(movingElement, 'by-center');
  if (!elementBelow) return;
  const droppableBelow = elementBelow.closest('.board-item');
  if (currentDroppable !== droppableBelow) {
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      if (!isAbove(movingElement, currentDroppable) || currentDroppable.classList.contains('emptySectionHiddenLesson')) {
        currentDroppable.parentNode.insertBefore(placeholder, currentDroppable);
      } else {
        currentDroppable.parentNode.insertBefore(placeholder, currentDroppable.nextElementSibling);
      }
    }
  }
};
const setMovingElement = event => {
  movingElement = event.target;
};
const onMouseUp = () => {
  if (!isDraggingStarted) {
    document.removeEventListener('mousemove', onMouseMove);
    movingElement.onmouseup = null;
    return;
  }
  placeholder.parentNode.insertBefore(movingElement, placeholder);
  Object.assign(movingElement.style, {
    position: 'relative',
    left: 'auto',
    top: 'auto',
    zIndex: 'auto',
    transform: 'none'
  });
  document.removeEventListener('mousemove', onMouseMove);
  isDraggingStarted = false;
  placeholder && placeholder.parentNode.removeChild(placeholder);
  movingElement.onmouseup = null;
  movingElement = null;
  processEmptySections();
};
const onMouseDown = event => {
  setMovingElement(event);
  shifts.set(event.clientX, event.clientY, movingElement);
  initialMovingElementPageXY.set(movingElement);
  document.addEventListener('mousemove', onMouseMove);
  movingElement.onmouseup = onMouseUp;
};
window.addEventListener('mouseover', () => {
  for (const draggableElement of document.querySelectorAll('.board-item')) {
    draggableElement.onmousedown = onMouseDown;
    draggableElement.ondragstart = () => false;
  }
});
function addCloseIcon(item) {
  if (closeIcon) {
    closeIcon.remove();
  }
  board.addCloseIcon(item);
  closeIcon = item.querySelector('.close-icon');
  closeIcon.addEventListener('click', event => {
    event.target.parentNode.remove();
  });
}
for (const board of document.querySelectorAll('.column')) {
  board.addEventListener('mouseover', event => {
    const item = event.target;
    const isItem = item.classList.contains('board-item');
    if (!isItem) return;
    addCloseIcon(item);
    item.addEventListener('mouseleave', () => {
      if (closeIcon) {
        closeIcon.remove();
      }
    });
  });
}
;// CONCATENATED MODULE: ./src/index.js




// TODO: write your code in app.js
/******/ })()
;