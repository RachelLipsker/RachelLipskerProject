const practiceType = document.querySelector('#practiceType');
const num1 = document.querySelector('#num1');
const sign = document.querySelector('#sign')
const num2 = document.querySelector('#num2');
const answer = document.querySelector('#answer');
const check = document.querySelector('#check');
const next = document.querySelector('#next');
const response = document.querySelector('#response');

function checksum(a, b, c) {
    return a + b == c
}
function checkSubtract(a, b, c) {
    return a - b == c
}
function checkMultiply(a, b, c) {
    return a * b == c
}
function checkDivision(a, b, c) {
    return a / b == c
}
function numsToSumAndMultiply() {
    num1.innerHTML = Math.floor(Math.random() * 11);
    num2.innerHTML = Math.floor(Math.random() * 11);
}
function numsToSubtract() {
    let a = Math.floor(Math.random() * 11);
    let b = Math.floor(Math.random() * 11);
    num1.innerHTML = Math.max(a, b);
    num2.innerHTML = Math.min(a, b);
}
function numsToDivision() {
    let a = Math.floor(Math.random() * 11);
    let b = Math.floor(Math.random() * 10 + 1);
    num1.innerHTML = a * b;
    num2.innerHTML = b;
}
function numsToPractice() {
    response.innerHTML = '';
    answer.value = '';
    if (practiceType.value == "-") {
        numsToSubtract();
    } else if (practiceType.value == ":") {
        numsToDivision();
    } else {
        numsToSumAndMultiply()
    }
}
function checkAnswer() {
    let a = +num1.innerText;
    let b = +num2.innerText;
    let c = +answer.value;
    function responseMessage(boolean) {
        if (boolean) {
            response.innerHTML = 'כל הכבוד! תשובה נכונה';
            response.style.color = '#99C741';

        } else {
            response.innerHTML = 'תשובה שגויה. נסה שנית';
            response.style.color = '#FF927F';
        }
    }
    if (practiceType.value == "+") {
        responseMessage((checksum(a, b, c)))
    } else if (practiceType.value == "-") {
        responseMessage((checkSubtract(a, b, c)))
    } else if (practiceType.value == ":") {
        responseMessage((checkDivision(a, b, c)))
    } else {
        responseMessage((checkMultiply(a, b, c)))
    }
}

sign.innerText = practiceType.value;
numsToPractice();
practiceType.addEventListener('change', (e) => {
    sign.innerText = practiceType.value;
    numsToPractice();
})

check.addEventListener('click', () => {
    checkAnswer();
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    checkAnswer();
})

next.addEventListener('click', () => {
    numsToPractice();
})