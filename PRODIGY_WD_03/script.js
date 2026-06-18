const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

const playAgainBtn = document.getElementById("playAgain");
const exitBtn = document.getElementById("exitGame");

const goodbyeScreen = document.getElementById("goodbye");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const drawScoreEl = document.getElementById("drawScore");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", newGame);
playAgainBtn.addEventListener("click", playAgain);
exitBtn.addEventListener("click", exitGame);

function handleCellClick(event) {

    const clickedCell = event.target;
    const index = clickedCell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (currentPlayer === "X") {
        clickedCell.classList.add("x");
    } else {
        clickedCell.classList.add("o");
    }

    checkWinner();
}

function checkWinner() {

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {

        const condition = winningConditions[i];

        const a = condition[0];
        const b = condition[1];
        const c = condition[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            roundWon = true;
            break;
        }
    }

    if (roundWon) {

        gameActive = false;

        winnerText.textContent =
            "🏆 Player " + currentPlayer + " Wins!";

        popup.style.display = "flex";

        statusText.textContent =
            "Player " + currentPlayer + " Wins!";

        if (currentPlayer === "X") {
            xScore++;
            xScoreEl.textContent = xScore;
        } else {
            oScore++;
            oScoreEl.textContent = oScore;
        }

        return;
    }

    let draw = true;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            draw = false;
            break;
        }
    }

    if (draw) {

        gameActive = false;

        drawScore++;
        drawScoreEl.textContent = drawScore;

        winnerText.textContent = "🤝 Match Draw!";
        popup.style.display = "flex";

        statusText.textContent = "Match Draw!";

        return;
    }

    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";
}

function clearBoard() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");
    });
}

function playAgain() {

    popup.style.display = "none";

    clearBoard();
}

function newGame() {

    popup.style.display = "none";

    clearBoard();

    xScore = 0;
    oScore = 0;
    drawScore = 0;

    xScoreEl.textContent = "0";
    oScoreEl.textContent = "0";
    drawScoreEl.textContent = "0";
}

function exitGame() {

    popup.style.display = "none";

    goodbyeScreen.style.display = "flex";
}