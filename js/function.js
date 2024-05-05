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
const restart = document.querySelector(".js-restart");
let currentPlayer = "circle";
let board = Array(9).fill(null);
let done = false;
let num = 0;

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.key, 10) - 1;
  if (board[index] !== null || done) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer === "circle" ? "○" : "×";
  if (checkWinner(board, winningPatterns)) {
    stateMessageElement.textContent = `${
      currentPlayer === "circle" ? "○" : "×"
    } win!!`;
    done = true;
    removeClickListener();
  } else {
    num++;
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    updateTurnDisplay(num);
  }
}

function updateTurnDisplay(num) {
  if (num === 9) {
    stateMessageElement.textContent = "draw";
    done = true;
    removeClickListener();
  }
  const turnItems = document.querySelectorAll(".turn-item");
  turnItems.forEach((item) => {
    item.classList.remove("active");
    if (item.classList.contains(currentPlayer)) {
      item.classList.add("active");
    }
  });
}

function checkWinner(cells, winningPatterns) {
  return winningPatterns.some((pattern) => {
    const [first, second, third] = pattern;
    return (
      cells[first] !== null &&
      cells[first] === cells[second] &&
      cells[second] === cells[third]
    );
  });
}

function removeClickListener() {
  cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
}

restart.addEventListener("click", restartGame);

function restartGame() {
  location.reload();
}

restart.addEventListener("mouseover", function () {
  restart.style.backgroundColor = "#000000";
  restart.style.color = "#fefefe";
});

restart.addEventListener("mouseleave", function () {
  restart.style.backgroundColor = "#fefefe";
  restart.style.color = "#000000";
});
