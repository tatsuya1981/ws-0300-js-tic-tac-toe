const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const stateMessageElement = document.querySelector(".js-state-message");
const cells = document.querySelectorAll(".js-cell");
let currentPlayer = "circle";
let board = Array(9).fill(null);

updateTurnDisplay();
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.key, 10) - 1;

  if (board[index] !== null || checkWinner()) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer === "circle" ? "○" : "×";

  if (checkWinner()) {
  } else if (board.every((cell) => cell !== null)) {
    stateMessageElement.textContent = "draw";
  } else {
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    updateTurnDisplay();
  }
}

function updateTurnDisplay() {
  const turnItems = document.querySelectorAll(".turn-item");
  turnItems.forEach((item) => {
    item.classList.remove("active");
    if (item.classList.contains(currentPlayer)) {
      item.classList.add("active");
    }
  });
}

function checkWinner() {
  return winningPatterns.some((pattern) => {
    if (pattern.every((index) => board[index] === currentPlayer)) {
      stateMessageElement.textContent = `${
        currentPlayer === "circle" ? "○" : "×"
      } win!!`;
      return true;
    }
    return false;
  });
}
