/**
 * Wordle
 * Erstellungsdatum: 11.07.2022
 * Daniel.V
 */

let checkedWords = 0;
let wroteChars = -1;
let searchedWord = '';
let currentWord = '';
let needToCheck = false;
// let word1 = [];
// let word2 = [];
// let word3 = [];
// let word4 = [];
// let word5 = [];

const checkbutton = document.getElementById("btnSend");

window.onload = init();

function init() {
    createNewWord();
}

function createNewWord() {
    const rndNumb = parseInt(Math.random() * countWordList());
    searchedWord = words[rndNumb].toUpperCase();
    console.log(searchedWord);
}

function countWordList() {
    const wordListAmount = words.length;
    return wordListAmount;
}

// Buchstaben eingeben
function logButton(clicked_ID) {
    const btn = document.getElementById(clicked_ID);
    const chr = btn.innerText;
    if (chr === 'del') {
        if (wroteChars >= 0) {
            wroteChars--;
            const str2 = currentWord.substring(0, currentWord.length - 1);
            currentWord = str2;
            document.getElementById("char_" + (wroteChars + 1)).innerHTML = '';
            console.log(currentWord);
            console.log(`DELETEEE. Chars: ${wroteChars}`);
        }
    } else {
        if (needToCheck === false) {
            document.getElementById("char_" + (wroteChars + 1)).innerHTML = chr;
            currentWord = currentWord += chr;
            wroteChars++;
            console.log(`Chars: ${wroteChars} -- ${currentWord}`);
            checkWordLength();
        }
    }
}

// Checkt Wortlänge um Prüfbutton einzublenden
function checkWordLength() {
    if (wroteChars === 4) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    }
}





// Checke Wort
checkbutton.addEventListener("click", () => {
    for(let i = 0; i <= 4; i++) {
       // Richtiger Buchstabe an gleicher Stelle?
        if(currentWord[i] === searchedWord[i]) {
            console.log('Bingo');
            // Buchstaben grün färben
            // Buchstabe bei Wort grün färben
        }else {
            if(searchedWord.includes(currentWord[i])) {
                console.log('Vorhanden');
            // Buchstaben grün färben
            // Buchstabe bei Wort orange färben

            }
        }



    }
})


