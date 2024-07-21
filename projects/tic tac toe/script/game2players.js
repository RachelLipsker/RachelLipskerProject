let player = localStorage.getItem("whoStart") || "X";
document.getElementById('subtitle').innerText = `התור של ${player}`
if (localStorage.getItem("whoStart") == "O") {
  localStorage.setItem("whoStart", "X");
} else {
  localStorage.setItem("whoStart", "O");
}
let board = ["", "", "", "", "", "", "", "", ""];
let start = new Date();
const response = document.getElementById('response');
response.innerHTML = "";
let gameResults = JSON.parse(localStorage.getItem("games")) || [];

class GameResult {
  winner;
  gameType = "שני <br>שחקנים"
  length;
  constructor(winner, start) {
    this.winner = winner;
    let now = new Date();
    this.length = Math.round((now - start) / 1000);
  }
}


function makeMove(cellIndex, cell) {
  if (board[cellIndex] === "") {
    board[cellIndex] = player; // save the click
    cell.innerText = player; //write the X/O inside the div
    if (player == "O") {
      cell.style.color = 'white';
    }
    let result = checkWinner();
    if (result === 1) {
      let gameResult = new GameResult(player, start); //תיעוד התוצאה
      gameResults.push(gameResult); // הוספה למערך התוצאות
      localStorage.setItem("games", JSON.stringify(gameResults)); //שמירה
      response.innerHTML = `${player} ניצח! כל הכבוד!`
      document.getElementById('subtitle').style.color = '#14BDAC'
      return;
    } else if (result === -1) {
      let gameResult = new GameResult("תיקו", start); //תיעוד התוצאה
      gameResults.push(gameResult); // הוספה למערך התוצאות
      localStorage.setItem("games", JSON.stringify(gameResults)); //שמירה
      response.innerHTML = "תיקו!"
      document.getElementById('subtitle').style.color = '#14BDAC'
      return;
    }
    player = player === "X" ? "O" : "X"; //toggle turn
    document.getElementById('subtitle').innerText = `התור של ${player}`

  }
}

function checkWinner() {
  //return 1 if there is a winner
  if ((board[0] == board[1] && board[1] == board[2] && board[2] != "") ||
    (board[3] == board[4] && board[4] == board[5] && board[5] != "") ||
    (board[6] == board[7] && board[7] == board[8] && board[8] != "") ||
    (board[0] == board[3] && board[3] == board[6] && board[6] != "") ||
    (board[1] == board[4] && board[4] == board[7] && board[7] != "") ||
    (board[2] == board[5] && board[5] == board[8] && board[8] != "") ||
    (board[0] == board[4] && board[4] == board[8] && board[8] != "") ||
    (board[2] == board[4] && board[4] == board[6] && board[6] != "")) {
    return 1;
  }
  //return -1 if its draw
  if (!board.includes("")) {
    return -1;
  }
  //return 0 if no winner yet
  return 0;
}

document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (response.innerHTML == "") {
      makeMove(index, cell);
    }
  });
});

document.querySelector('.restart-button').addEventListener('click', () => {
  location.reload();
})
document.getElementById('menu').addEventListener('click', () => {
  location.href = "./index.html"
})
