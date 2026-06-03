const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
}

function checkWinner() {
    for(let pattern of winPatterns) {
        const [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){
            statusText.textContent = `${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    if(!board.includes("")) {
        statusText.textContent = "Draw!";
        gameActive = false;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => cell.textContent = "");

    statusText.textContent = "Player X Turn";
}