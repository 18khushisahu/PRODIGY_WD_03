// Variables for the game
const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
const status = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] !== "" || !isGameActive) return;

    updateCell(cell, index);
    checkWinner();
}

// Update cell and board
function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.innerText = currentPlayer;
}

// Check for winner or draw
function checkWinner() {
    let winnerFound = false;

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winnerFound = true;
            endGame(currentPlayer);
            return;
        }
    }

    if (!gameBoard.includes("")) {
        endGame("Draw");
        return;
    }

    switchPlayer();
}

// Switch player
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.innerText = `Player ${currentPlayer}'s Turn`;
}

// End game
function endGame(result) {
    isGameActive = false;
    if (result === "Draw") {
        status.innerText = "It's a Draw!";
    } else {
        status.innerText = `Player ${result} Wins!`;
    }
}

// Reset game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    status.innerText = "Player X's Turn";
    cells.forEach(cell => (cell.innerText = ""));
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
