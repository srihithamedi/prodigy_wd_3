// Variables to track game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Get DOM elements
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Initialize game board
function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.addEventListener("click", handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

// Handle cell clicks
function handleCellClick(event) {
  const cellIndex = event.target.dataset.index;

  // Ignore clicks on already taken cells or if the game is over
  if (board[cellIndex] !== "" || !gameActive) return;

  // Update board state and UI
  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  // Check for winner or draw
  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusElement.textContent = "It's a draw!";
    gameActive = false;
  } else {
    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = "Player X's turn";
  createBoard();
}

// Event listener for reset button
resetButton.addEventListener("click", resetGame);

// Initialize game
createBoard();
