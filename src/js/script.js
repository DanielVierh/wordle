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
let idLogger = [];
// let word1 = [];
// let word2 = [];
// let word3 = [];
// let word4 = [];
// let word5 = [];

const checkbutton = document.getElementById('btnSend');

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
            document.getElementById('char_' + (wroteChars + 1)).innerHTML = '';
            idLogger.splice(-1, 1);
            console.log(currentWord);
            checkWordLength();
        }
    } else {
        if (needToCheck === false) {
            idLogger.push(clicked_ID);
            document.getElementById('char_' + (wroteChars + 1)).innerHTML = chr;
            currentWord = currentWord += chr;
            wroteChars++;
            checkWordLength();
        }
    }
}

// Checkt Wortlänge um Prüfbutton einzublenden
function checkWordLength() {
    if (wroteChars === 4) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else {
        checkbutton.style.visibility = 'hidden';
        needToCheck = false;
    }
}

// Checke Wort
checkbutton.addEventListener('click', () => {
    // Prüfe, ob Wort in Words Array existiert
    let wordExists = false;
    for (let i = 0; i < words.length; i++) {
        const comparedWord = words[i].toUpperCase();
        if (comparedWord === currentWord) {
            wordExists = true;
            if (searchedWord.toUpperCase() === currentWord) {
                console.log('Gewonnen');
                //!Todo: - Gewonnen Funktion
            }
        }
    }

    if (wordExists === true) {
        checkedWords++;
        checkLetters();
    } else {
        alert('Das Wort wurde nicht gefunden');
        //! Auskommentieren
        // checkLetters();
    }
});

// !Todo: idlogger resetten
// !Todo: zum nächsten wort
// !Todo: -

function checkLetters() {
    let stillGreen = [];
    for (let i = 0; i <= 4; i++) {
        if (searchedWord.includes(currentWord[i])) {
            if (stillGreen.includes(idLogger[i])) {
                console.log('Bereits grün');
                document.getElementById('char_' + i).style.backgroundColor =
                'orange';
            } else {
                // Buchstaben orange färben
                document.getElementById(idLogger[i]).style.backgroundColor =
                    'orange';
                // Buchstabe bei Wort orange färben
                document.getElementById('char_' + i).style.backgroundColor =
                    'orange';
            }
        } else {
            document.getElementById(idLogger[i]).style.backgroundColor =
                'rgba(0,0,0,0.5)';
            document.getElementById('char_' + i).style.backgroundColor =
                'rgba(0,0,0,0.5)';
        }
        // Richtiger Buchstabe an gleicher Stelle?
        if (currentWord[i] === searchedWord[i]) {
            stillGreen.push(idLogger[i]);
            // Buchstaben grün färben
            document.getElementById(idLogger[i]).style.backgroundColor =
                'green';
            // Buchstabe bei Wort grün färben
            document.getElementById('char_' + i).style.backgroundColor =
                'green';
        }
    }
}
