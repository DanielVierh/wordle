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
let tileLogger = [];
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
        // Es soll nur bis zum ersten Buchstben des Wortes gelöscht werden
        if(checkedWords === 0) {
            deleteLastChar(0);
        }else if(checkedWords === 1) {
            deleteLastChar(5);
        }else if(checkedWords === 2) {
            deleteLastChar(10);
        }else if(checkedWords === 3) {
            deleteLastChar(15);
        }else if(checkedWords === 4) {
            deleteLastChar(20);
        }
    } else {
        if (needToCheck === false) {
            idLogger.push(clicked_ID);
            tileLogger.push('char_' + (wroteChars + 1))
            document.getElementById('char_' + (wroteChars + 1)).innerHTML = chr;
            currentWord = currentWord += chr;
            wroteChars++;
            checkWordLength();
        }
    }
}

function deleteLastChar(lastIndex) {
    if (wroteChars >= lastIndex) {
        wroteChars--;
        const str2 = currentWord.substring(0, currentWord.length - 1);
        currentWord = str2;
        document.getElementById('char_' + (wroteChars + 1)).innerHTML = '';
        idLogger.splice(-1, 1);
        tileLogger.splice(-1, 1);
        console.log(currentWord);
        checkWordLength();
    }
}

// Checkt Wortlänge um Prüfbutton einzublenden
function checkWordLength() {
    if (checkedWords === 0 && wroteChars === 4) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if(checkedWords === 1 && wroteChars === 9) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if(checkedWords === 2 && wroteChars === 14) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    }
    
    else {
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
        checkLetters();
    } else {
        alert('Das Wort wurde nicht gefunden');
        //? Checkletters nur zum testen verwenden sonst auskommentieren
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
                // document.getElementById('char_' + i).style.backgroundColor = 'orange';
                   document.getElementById(tileLogger[i]).style.backgroundColor = 'orange';
            } else {
                console.log('vorhanden aber woanders');
                // Buchstaben orange färben
                document.getElementById(idLogger[i]).style.backgroundColor =
                    'orange';
                // Buchstabe bei Wort orange färben
                // document.getElementById('char_' + i).style.backgroundColor = 'orange';
                document.getElementById(tileLogger[i]).style.backgroundColor = 'orange';
            }
        } else {
            console.log('Buchstabe nicht vorhanden');
            document.getElementById(idLogger[i]).style.backgroundColor =
                'rgba(0,0,0,0.5)';
            // document.getElementById('char_' + i).style.backgroundColor = 'rgba(0,0,0,0.5)';
            document.getElementById(tileLogger[i]).style.backgroundColor = 'rgba(0,0,0,0.5)';
        }
        // Richtiger Buchstabe an gleicher Stelle?
        if (currentWord[i] === searchedWord[i]) {
            stillGreen.push(idLogger[i]);
            // Buchstaben grün färben
            document.getElementById(idLogger[i]).style.backgroundColor =
                'green';
            // Buchstabe bei Wort grün färben
            // document.getElementById('char_' + i).style.backgroundColor = 'green';
            document.getElementById(tileLogger[i]).style.backgroundColor = 'green';
        }
    }

     //stillGreen = [];
     idLogger = [];
     tileLogger = [];
     checkedWords++;
     needToCheck = false;
     checkbutton.style.visibility = 'hidden';
     currentWord = '';
}
