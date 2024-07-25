class Word {
    #word: string = "";
    #hint: string = "";
    get word() {
        return this.#word;
    }
    set word(value: string) {
        let newWord: string = value.slice(0, -1);
        if (value[value.length - 1] == "ם") {
            newWord += "מ";
        } else if (value[value.length - 1] == "ן") {
            newWord += "נ";
        } else if (value[value.length - 1] == "ץ") {
            newWord += "צ";
        } else if (value[value.length - 1] == "ף") {
            newWord += "פ";
        } else if (value[value.length - 1] == "ך") {
            newWord += "ב";
        } else {
            newWord += value[value.length - 1];
        }
        this.#word = newWord;
    }
    get hint() {
        return this.#hint;
    }
    set hint(value: string) {
        this.#hint = "רמז: " + value;
    }
    constructor(word: string, hint: string) {
        this.word = word;
        this.hint = hint;
    }
    getCharsWord(): string[] {
        return this.#word.split("");
    }
}

//בניית מערך עם מילים ורמזים
let wordsArr: Word[] = [];
wordsArr.push(new Word("אברהם", "אבינו"));
wordsArr.push(new Word("יצחק", "אבינו"));
wordsArr.push(new Word("יעקב", "אבינו"));
wordsArr.push(new Word("שרה", "אימנו"));
wordsArr.push(new Word("רבקה", "אימנו"));
wordsArr.push(new Word("רחל", "אימנו"));
wordsArr.push(new Word("לאה", "אימנו"));
wordsArr.push(new Word("ראובן", "משבטי ישראל"));
wordsArr.push(new Word("שמעון", "משבטי ישראל"));
wordsArr.push(new Word("לוי", "משבטי ישראל"));
wordsArr.push(new Word("יהודה", "משבטי ישראל"));
wordsArr.push(new Word("יששכר", "משבטי ישראל"));
wordsArr.push(new Word("זבולון", "משבטי ישראל"));
wordsArr.push(new Word("דן", "משבטי ישראל"));
wordsArr.push(new Word("נפתלי", "משבטי ישראל"));
wordsArr.push(new Word("גד", "משבטי ישראל"));
wordsArr.push(new Word("אשר", "משבטי ישראל"));
wordsArr.push(new Word("מנשה", "משבטי ישראל"));
wordsArr.push(new Word("אפרים", "משבטי ישראל"));
wordsArr.push(new Word("בנימין", "משבטי ישראל"));
wordsArr.push(new Word("משה", "ענו מכל האדם"));
wordsArr.push(new Word("אהרן", "רודף שלום"));
wordsArr.push(new Word("פנחס", "יש פרשה בשמו"));
wordsArr.push(new Word("יתרו", "יש פרשה בשמו"));
wordsArr.push(new Word("נח", "יש פרשה בשמו"));
wordsArr.push(new Word("אליעזר", "דולה ומשקה"));
wordsArr.push(new Word("אדם", "הראשון"));
wordsArr.push(new Word("חוה", "אם כל חי"));
wordsArr.push(new Word("שם", "בן נוח"));
wordsArr.push(new Word("חם", "בן נוח"));
wordsArr.push(new Word("יפת", "בן נוח"));
wordsArr.push(new Word("מהללאל", "בנו של קינן"));
wordsArr.push(new Word("יסכה", "זו שרה"));
wordsArr.push(new Word("לוט", "קרוב משפחה של אברהם"));
wordsArr.push(new Word("בתואל", "אב רבקה"));
wordsArr.push(new Word("הגר", "היא קטורה"));
wordsArr.push(new Word("לבן", "אב אימהות"));
wordsArr.push(new Word("דינה", "בת יעקב"));
wordsArr.push(new Word("שרח", "בת אשר"));
wordsArr.push(new Word("יוסף", "משנה למלך"));
wordsArr.push(new Word("שפרה", "מיילדת"));
wordsArr.push(new Word("פועה", "מיילדת"));
wordsArr.push(new Word("עמרם", "בן קהת"));
wordsArr.push(new Word("צפורה", "כושית"));
wordsArr.push(new Word("יהושע", "הכניס את ישראל לארץ"));
wordsArr.push(new Word("חור", "בנה של מרים"));
wordsArr.push(new Word("בצלאל", "בונה המשכן"));
wordsArr.push(new Word("נדב", "מבני אהרן"));
wordsArr.push(new Word("אביהוא", "מבני אהרן"));
wordsArr.push(new Word("אלעזר", "מבני אהרן"));
wordsArr.push(new Word("איתמר", "מבני אהרן"));
wordsArr.push(new Word("גרשום", "מבני משה"));
wordsArr.push(new Word("אליעזר", "מבני משה"));
wordsArr.push(new Word("בתיה", "בת פרעה"));
wordsArr.push(new Word("סדום", "התהפכה"));
wordsArr.push(new Word("מצרים", "יצאו משם"));
wordsArr.push(new Word("חברון", "מקום המערה"));
wordsArr.push(new Word("רחובות", "באר יעקב"));
wordsArr.push(new Word("חברון", "מקום המערה"));
wordsArr.push(new Word("פניאל", "שם נפגש יעקב עם המלאך"));
wordsArr.push(new Word("שכם", "שם רעו צאן בני יעקב"));
wordsArr.push(new Word("מדין", "ארץ יתרו"));
wordsArr.push(new Word("מרה", "שם התמתקו המים"));
wordsArr.push(new Word("רפידים", "משם נסעו להר סיני"));

const htmlWord: HTMLDivElement = document.querySelector('.word') as HTMLDivElement;
const htmlHint: HTMLDivElement = document.querySelector('.hint') as HTMLDivElement;
const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll('.cell');
const span: HTMLSpanElement = document.querySelector('.incorrect span') as HTMLSpanElement;
const img: HTMLImageElement = document.querySelector('img') as HTMLImageElement;

let randomWord: Word = getRandomWord();
let charsWord: string[] = randomWord.getCharsWord();
let htmlChars: HTMLDivElement[] = presentWord(randomWord);

let counterCorrect: number = 0;
let counterIncorrect: number = 0;

//פונקציה לבחירת מילה אקראית
function getRandomWord(): Word {
    let random: number = Math.floor(Math.random() * wordsArr.length);
    return wordsArr[random];
}

//פונקציה שבונה דיבים מציגה אותם על המסך ושומרת במערך
function presentWord(word: Word): HTMLDivElement[] {
    htmlHint.innerText = word.hint;
    let htmlChars: HTMLDivElement[] = [];
    for (let i: number = 0; i < word.word.length; i++) {
        let char: HTMLDivElement = document.createElement('div');
        char.innerText = "_";
        char.classList.add('char');
        htmlWord.appendChild(char);
        htmlChars.push(char);
    }
    return htmlChars;
}

//פונקציה הבודקת אם אות קיימת במילה ושומרת את המיקומים במערך
function checkChar(char: string, charsWord: string[]): number[] {
    let places: number[] = [];
    for (let i: number = 0; i < charsWord.length; i++) {
        if (char == charsWord[i]) {
            places.push(i);
        }
    }
    counterCorrect += places.length;
    return places;
}

//פונקציית צעד המשחק שתופעל בלחיצה על כל אות
function clickChar(char: string, index: number): void {
    let places: number[] = checkChar(char, charsWord);
    if (places.length >= 1) {
        for (let i: number = 0; i < places.length; i++) {
            htmlChars[places[i]].innerText = charsWord[places[i]];
        }
        if (counterCorrect == charsWord.length) {
            htmlHint.innerText = "כל הכבוד!";
            cells.forEach((cell: HTMLDivElement) => {
                cell.style.pointerEvents = 'none';
            })
        }
    } else {
        counterIncorrect++;
        span.innerText = `${counterIncorrect}/6`;
        img.src = `./images/${counterIncorrect}.png`;
        if (counterIncorrect == 6) {
            htmlHint.innerText = `אולי תצליח בפעם הבאה. התשובה היא: ${randomWord.word}`;
            cells.forEach((cell: HTMLDivElement) => {
                cell.style.pointerEvents = 'none';
            })
        }
    }
    cells[index].style.backgroundColor = '#9194D0';
    cells[index].style.pointerEvents = 'none';
}

cells.forEach((cell: HTMLDivElement, index: number): void => {
    cell.addEventListener('click', (): void => {
        clickChar(cell.innerText, index);
    })
})

const button: HTMLButtonElement = document.querySelector('button') as HTMLButtonElement;
button.addEventListener('click', (): void => {
    location.reload();
})