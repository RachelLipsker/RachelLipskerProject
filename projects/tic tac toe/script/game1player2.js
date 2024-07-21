let board = ["", "", "", "", "", "", "", "", ""];
let start = new Date();
const response = document.getElementById('response');
response.innerHTML = "";
let gameResults = JSON.parse(localStorage.getItem("games")) || [];

if (localStorage.getItem("startingGame") == "1") {
    localStorage.setItem("startingGame", "0")
} else {
    localStorage.setItem("startingGame", "1")
}
let whoStart = localStorage.getItem("startingGame") || "0";

class GameResult {
    winner;
    gameType = "מול מחשב - בינוני"
    length;
    constructor(winner, start) {
        this.winner = winner;
        let now = new Date();
        this.length = Math.round((now - start) / 1000);
    }
}

if (whoStart == "0") {
    let computerMove = Math.floor(Math.random() * 9);
    board[computerMove] = "O"; // save the click
    document.querySelectorAll(".cell")[computerMove].innerText = "O";
    document.querySelectorAll(".cell")[computerMove].style.color = "white";

}
function makeMove(cellIndex, cell) {
    board[cellIndex] = "X"; // save the click
    cell.innerText = "X"; //write the X inside the div
    let result = checkWinner();// בדיקת ניצחון לאיקס
    if (result === 1) {
        let gameResult = new GameResult("אני", start); //תיעוד התוצאה
        gameResults.push(gameResult); // הוספה למערך התוצאות
        localStorage.setItem("games", JSON.stringify(gameResults)); //שמירה
        response.innerHTML = `ניצחת את המחשב <br> כל הכבוד!`
        return;
    } else if (result === -1) {
        let gameResult = new GameResult("תיקו", start); //תיעוד התוצאה
        gameResults.push(gameResult); // הוספה למערך התוצאות
        localStorage.setItem("games", JSON.stringify(gameResults)); //שמירה
        response.innerHTML = "תיקו!"
        return;
    }
    setTimeout(() => {
        let computerMove = computerChoice();
        board[computerMove] = "O"; // save the click
        document.querySelectorAll(".cell")[computerMove].innerText = "O";
        document.querySelectorAll(".cell")[computerMove].style.color = "white";
        result = checkWinner();
        if (result === 1) {
            let gameResult = new GameResult("מחשב", start); //תיעוד התוצאה
            gameResults.push(gameResult); // הוספה למערך התוצאות
            localStorage.setItem("games", JSON.stringify(gameResults)); //שמירה
            response.innerHTML = "המחשב ניצח!"
            return;
        } else if (result === -1) {
            let gameResult = new GameResult("תיקו", start); //תיעוד התוצאה
            gameResults.push(gameResult); // הוספה למערך התוצאות
            localStorage.setItem("games", JSON.stringify(gameResults)); //שמירה
            response.innerHTML = "תיקו!"
            return;
        }
    }, 300)
}

function computerChoice() {
    //בדיקה אם המחשב יכול לנצח
    if (board[0] == "") {
        if (board[1] + board[2] == "OO" || board[3] + board[6] == "OO" || board[4] + board[8] == "OO") {
            return 0;
        }
    }
    if (board[1] == "") {
        if (board[0] + board[2] == "OO" || board[4] + board[7] == "OO") {
            return 1;
        }
    }
    if (board[2] == "") {
        if (board[0] + board[1] == "OO" || board[4] + board[6] == "OO" || board[5] + board[8] == "OO") {
            return 2;
        }
    }
    if (board[3] == "") {
        if (board[0] + board[6] == "OO" || board[4] + board[5] == "OO") {
            return 3;
        }
    }
    if (board[4] == "") {
        if (board[1] + board[7] == "OO" || board[3] + board[5] == "OO" || board[0] + board[8] == "OO" || board[2] + board[6] == "OO") {
            return 4;
        }
    }
    if (board[5] == "") {
        if (board[2] + board[8] == "OO" || board[3] + board[4] == "OO") {
            return 5;
        }
    }
    if (board[6] == "") {
        if (board[0] + board[3] == "OO" || board[2] + board[4] == "OO" || board[7] + board[8] == "OO") {
            return 6;
        }
    }
    if (board[7] == "") {
        if (board[1] + board[4] == "OO" || board[6] + board[8] == "OO") {
            return 7;
        }
    }
    if (board[8] == "") {
        if (board[0] + board[4] == "OO" || board[2] + board[5] == "OO" || board[6] + board[7] == "OO") {
            return 8;
        }
    }

    //בדיקה אם איקס עלול לנצח, ולחסום אותו
    if (board[0] == "") {
        if (board[1] + board[2] == "XX" || board[3] + board[6] == "XX" || board[4] + board[8] == "XX") {
            return 0;
        }
    }
    if (board[1] == "") {
        if (board[0] + board[2] == "XX" || board[4] + board[7] == "XX") {
            return 1;
        }
    }
    if (board[2] == "") {
        if (board[0] + board[1] == "XX" || board[4] + board[6] == "XX" || board[5] + board[8] == "XX") {
            return 2;
        }
    }
    if (board[3] == "") {
        if (board[0] + board[6] == "XX" || board[4] + board[5] == "XX") {
            return 3;
        }
    }
    if (board[4] == "") {
        if (board[1] + board[7] == "XX" || board[3] + board[5] == "XX" || board[0] + board[8] == "XX" || board[2] + board[6] == "XX") {
            return 4;
        }
    }
    if (board[5] == "") {
        if (board[2] + board[8] == "XX" || board[3] + board[4] == "XX") {
            return 5;
        }
    }
    if (board[6] == "") {
        if (board[0] + board[3] == "XX" || board[2] + board[4] == "XX" || board[7] + board[8] == "XX") {
            return 6;
        }
    }
    if (board[7] == "") {
        if (board[1] + board[4] == "XX" || board[6] + board[8] == "XX") {
            return 7;
        }
    }
    if (board[8] == "") {
        if (board[0] + board[4] == "XX" || board[2] + board[5] == "XX" || board[6] + board[7] == "XX") {
            return 8;
        }
    }

    // לשים באמצע אם אפשר
    if (board[4] == "") {
        return 4;
    }

    // לשים ליד עיגול קיים
    let arr = randonArray();
    for (let random of arr) {
        if (board[random] == "") {
            if ((random == 0 && checkRandom0()) || (random == 2 && checkRandom2()) || (random == 6 && checkRandom6()) || (random == 8 && checkRandom8()) || ((random == 1 && checkRandom1())) || (random == 3 && checkRandom3()) || (random == 5 && checkRandom5()) || (random == 7 && checkRandom7())) {
                return random;
            }
        }
    }

    // משחק חדש (אין שום עיגול קיים) ו4 תפוס = לשים ברנדומלי פנוי
    let random2 = Math.floor(Math.random() * 9)
    while (board[random2] != "") {
        random2 = Math.floor(Math.random() * 9)
    }
    return random2;
}

function randonArray() {
    let arr = [];
    while (arr.length != 9) {
        let random = Math.floor(Math.random() * 9);
        counter = 0;
        arr.forEach(item => {
            if (random == item) {
                counter++
            }
        })
        if (counter == 0) {
            arr.push(random);
        }
    }
    return arr;
}

function checkRandom0() {
    return (board[1] + board[2] == "O" || board[3] + board[6] == "O" || board[4] + board[8] == "O")
}
function checkRandom2() {
    return (board[0] + board[1] == "O" || board[4] + board[6] == "O" || board[5] + board[8] == "O")
}
function checkRandom6() {
    return (board[0] + board[3] == "O" || board[2] + board[4] == "O" || board[7] + board[8] == "O")
}
function checkRandom8() {
    return (board[0] + board[4] == "O" || board[2] + board[5] == "O" || board[6] + board[7] == "O")
}
function checkRandom1() {
    return (board[0] + board[2] == "O" || board[4] + board[7] == "O")
}
function checkRandom3() {
    return (board[0] + board[6] == "O" || board[4] + board[5] == "O")
}
function checkRandom5() {
    return (board[2] + board[8] == "O" || board[3] + board[4] == "O")
}
function checkRandom7() {
    return (board[1] + board[4] == "O" || board[6] + board[8] == "O")
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
        if (response.innerHTML == "" && board[index] == "") {
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

