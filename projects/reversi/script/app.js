//תא ריק 0
//תא צהוב 2
//תא ירוק 3

//הכנת הלוח לתחילת המשחק
const cells = document.querySelectorAll('.cell');

let board = [];
for (let i = 0; i < 64; i++) {
    board[i] = 0;
}

board[27] = 3;
board[28] = 2;
board[35] = 2;
board[36] = 3;
board.forEach((item, index) => {
    if (item == 2) {
        cells[index].style.backgroundColor = 'yellow';
    } else if (item == 3) {
        cells[index].style.backgroundColor = '#51BF5E';
    }
})

let player = 2;
doOptions(2);


function makeMove(index) {
    let right = checkRightRoute(index, player);
    let left = checkLeftRoute(index, player);
    let down = checkDownRoute(index, player);
    let up = checkUpRoute(index, player);
    let downRight = checkDownRightRoute(index, player);
    let downLeft = checkDownLeftRoute(index, player);
    let upRight = checkUpRightRoute(index, player);
    let upLeft = checkUpLeftRoute(index, player);

    let optionsArr = checkOptions(player);

    if (optionsArr[index] == 4) {
        if (right != -1) {
            doRightRoute(index, right, player);
        }
        if (left != -1) {
            doLeftRoute(index, left, player);
        }
        if (down != -1) {
            doDownRoute(index, down, player);
        }
        if (up != -1) {
            doUpRoute(index, up, player);
        }
        if (downRight != -1) {
            doDownRightRoute(index, downRight, player);
        }
        if (downLeft != -1) {
            doDownLeftRoute(index, downLeft, player);
        }
        if (upRight != -1) {
            doUpRightRoute(index, upRight, player);
        }
        if (upLeft != -1) {
            doUpLeftRoute(index, upLeft, player);
        }

        // בדיקת ניצחון
        if (fullBoard()) {
            cells.forEach(item => {
                item.innerHTML = '';
            })
            let yellowScore = yellowScores();
            document.querySelector('.turn').style.fontSize = '30px';
            if (yellowScore == 32) {
                document.querySelector('.turn').innerHTML = 'תיקו!';
                return;
            } else if (yellowScore > 32) {
                document.querySelector('.turn').innerHTML = `הצהוב ניצח: ${yellowScore} מול ${64 - yellowScore}`;
                return;
            } else {
                document.querySelector('.turn').innerHTML = `הירוק ניצח: ${64 - yellowScore} מול ${yellowScore}`;
                return;
            }
        }

        // החלפת שחקן
        player = player === 2 ? 3 : 2;
        if (player == 2) {
            document.getElementById('turn').style.background = 'yellow';
        } else {
            document.getElementById('turn').style.background = '#51BF5E';
        }
        //סימון האופציות שהוא יוכל לבצע
        doOptions(player);
        // בדיקה אם יש לשחקן אופציות
        let numberOption = numberOptions(player);
        if (numberOption == 0) {
            document.querySelector('.turn').innerHTML += `<p>אין משבצות אפשריות, המשחק נגמר</p>`
            return;
        }
    }
}


// פונקציות בדיקת מסלולים
function checkRightRoute(index, player) {
    if (index % 8 == 7) {
        return -1;
    }
    let i = index + 1;
    let stop = -1;
    while (i % 8 > 0) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i++;
        }
    }
    if (stop > index + 1) {
        return stop;
    } else {
        return -1;
    }
}

function checkLeftRoute(index, player) {
    if (index % 8 == 0) {
        return -1;
    }
    let i = index - 1;
    let stop = -1;
    while (i % 8 != 7 && i >= 0) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i--;
        }
    }
    if (stop < index - 1) {
        return stop;
    } else {
        return -1;
    }
}

function checkDownRoute(index, player) {
    if (index >= 56 && index <= 63) {
        return -1;
    }
    let i = index + 8;
    let stop = -1;
    while (i < 64) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i += 8;
        }
    }
    if (stop > index + 8) {
        return stop;
    } else {
        return -1;
    }
}

function checkUpRoute(index, player) {
    if (index >= 0 && index <= 7) {
        return -1;
    }
    let i = index - 8;
    let stop = -1;
    while (i >= 0) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i -= 8;
        }
    }
    if (stop < index - 8) {
        return stop;
    } else {
        return -1;
    }
}

function checkDownRightRoute(index, player) {
    if ((index % 8 == 7) || (index >= 56 && index <= 63)) {
        return -1;
    }
    let i = index + 9;
    let stop = -1;
    while (i < 64) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i += 9;
        }
    }
    if (stop > index + 9) {
        return stop;
    } else {
        return -1;
    }
}

function checkDownLeftRoute(index, player) {
    if ((index % 8 == 0) || (index >= 56 && index <= 63)) {
        return -1;
    }
    let i = index + 7;
    let stop = -1;
    while (i < 63) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i += 7;
        }
    }
    if (stop > index + 7) {
        return stop;
    } else {
        return -1;
    }
}

function checkUpLeftRoute(index, player) {
    if ((index % 8 == 0) || (index >= 0 && index <= 7)) {
        return -1;
    }
    let i = index - 9;
    let stop = -1;
    while (i >= 0) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i -= 9;
        }
    }
    if (stop < index - 9) {
        return stop;
    } else {
        return -1;
    }
}

function checkUpRightRoute(index, player) {
    if ((index % 8 == 7) || (index >= 0 && index <= 7)) {
        return -1;
    }
    let i = index - 7;
    let stop = -1;
    while (i > 0) {
        if (board[i] == 0) {
            return -1;
        } else if (board[i] == player) {
            stop = i;
            break;
        } else {
            i -= 7;
        }
    }
    if (stop < index - 7) {
        return stop;
    } else {
        return -1;
    }
}

//פונקציות שמבצעות את המסלולים
function doRightRoute(index, stop, player) {
    for (let i = index; i < stop; i++) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doLeftRoute(index, stop, player) {
    for (let i = index; i > stop; i--) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doDownRoute(index, stop, player) {
    for (let i = index; i < stop; i += 8) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doUpRoute(index, stop, player) {
    for (let i = index; i > stop; i -= 8) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doDownRightRoute(index, stop, player) {
    for (let i = index; i < stop; i += 9) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doDownLeftRoute(index, stop, player) {
    for (let i = index; i < stop; i += 7) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doUpRightRoute(index, stop, player) {
    for (let i = index; i > stop; i -= 7) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}

function doUpLeftRoute(index, stop, player) {
    for (let i = index; i > stop; i -= 9) {
        board[i] = player;
        if (player == 2) {
            cells[i].style.backgroundColor = 'yellow'
        } else if (player == 3) {
            cells[i].style.backgroundColor = '#51BF5E'
        }
    }
}


function yellowScores() {
    let yellow = 0;
    board.forEach(item => {
        if (item == 2) {
            yellow++;
        }
    })
    return yellow;
}

function fullBoard() {
    for (let i = 0; i < 64; i++) {
        if (board[i] == 0) {
            return false;
        }
    }
    return true;
}


function checkOptions(player) {
    // בניית מערך בו יש 4 אם יש אופציה ללחיצה ו-2 אם אין
    let options = board.map((item, index) => {
        let right = checkRightRoute(index, player);
        let left = checkLeftRoute(index, player);
        let down = checkDownRoute(index, player);
        let up = checkUpRoute(index, player);
        let downRight = checkDownRightRoute(index, player);
        let downLeft = checkDownLeftRoute(index, player);
        let upRight = checkUpRightRoute(index, player);
        let upLeft = checkUpLeftRoute(index, player);
        if (board[index] == 0 &&
            (right != -1 || left != -1 || down != -1 || up != -1 || downRight != -1
                || downLeft != -1 || upRight != -1 || upLeft != -1)) {
            return 4;
        } else {
            return -2;
        }
    })
    return options;
}

function numberOptions(player) {
    let options = checkOptions(player);
    let counter = 0;
    options.forEach(option => {
        if (option == 4) {
            counter++;
        }
    })
    return counter;
}

function doOptions(player) {
    //ריקון הלוח מסימונים קודמים
    cells.forEach(item => {
        item.innerHTML = '';
    })
    // סימון המשבצות הניתנות ללחיצה על הלוח
    let options = checkOptions(player);
    options.forEach((option, index) => {
        if (option == 4) {
            cells[index].innerHTML = '&#9675;';
        }
    })
}


cells.forEach((item, index) => {
    item.addEventListener('click', () => {
        makeMove(index);
    })
})

document.getElementById('restart').addEventListener('click', () => {
    location.reload();
})

