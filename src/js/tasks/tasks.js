export default class Board {
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
