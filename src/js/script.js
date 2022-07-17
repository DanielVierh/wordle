/**
 * Wordle
 * Erstellungsdatum: 11.07.2022
 * Daniel.V
 */

// !Todo: 

let checkedWords = 0;
let wroteChars = -1;
let searchedWord = '';
let currentWord = '';
let needToCheck = false;
let idLogger = [];
let tileLogger = [];
let lastPoints = 0;


let creditObj = {
    credits: 0,
    level: 0
}


const checkbutton = document.getElementById('btnSend');
const continueButton = document.getElementById("btnCont");
const lblLevel = document.getElementById("lblLevel");
const lblCredits = document.getElementById("lblCredits");
const animationLbl = document.getElementById("pointanimation");

// Bis 1782
const wordlist = ["Akkus", "Aktie", "Album", "Ahorn", "Alarm", "Alpen", "Apell", "Asche", "Asien", "Athen", "Atmen", "atmet", "Audit", "Audio", "Augen", "Autor", "Autos", "Azubi", "Baden", "Bauer", "banal", "Bambi", "Basel", "Bauch", "bauen", "Bayer", "Beere", "Beine", "Beleg", "Berge", "Besen", "Beule", "Bevor", "Bezug", "Biber", "Bibel", "Biege", "Biene", "Bingo", "Birma", "Bison", "Bleib", "Blech", "Blick", "Blitz", "Block", "Blond", "Bohne", "bohrt", "Bombe", "Brand", "Braue", "Braun", "Bravo", "breit", "Brett", "Brief", "Brise", "Brite", "Brote", "Bruch", "Buche", "Bucht", "Budda", "Buhne", "Bytes", "Cargo", "Chips", "China", "Chile", "Chili", "Chrom", "circa", "Dabei", "Dachs", "Daher", "dahin", "Damit", "Danke", "Daten", "Datum", "Dauer", "Davon", "Davor", "Decke", "Degen", "Deich", "deine", "Demut", "Depot", "denke", "Dicht", "Diebe", "dient", "Diese", "Dings", "Dirne", "Disko", "Dreck", "Duden", "Duell", "Durch", "Durst", "Ebene", "Echse", "Eckel", "eckig"]

window.onload = init();

function init() {
    createNewWord();
    load_from_LocalStorage();
}

function createNewWord() {
    const rndNumb = parseInt(Math.random() * countWordList());
    searchedWord = wordlist[rndNumb].toUpperCase();
    console.log(searchedWord);
}

function countWordList() {
    const wordListAmount = wordlist.length;
    console.log(wordListAmount);
    return wordListAmount;
}

// Buchstaben eingeben
function logButton(clicked_ID) {
    const btn = document.getElementById(clicked_ID);
    const chr = btn.innerText;
    if (chr === 'del') {
        // Es soll nur bis zum ersten Buchstben des Wortes gelöscht werden
        if (checkedWords === 0) {
            deleteLastChar(0);
        } else if (checkedWords === 1) {
            deleteLastChar(5);
        } else if (checkedWords === 2) {
            deleteLastChar(10);
        } else if (checkedWords === 3) {
            deleteLastChar(15);
        } else if (checkedWords === 4) {
            deleteLastChar(20);
        } else if (checkedWords === 5) {
            deleteLastChar(25);
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
        console.log(`Lösche bis: ${lastIndex} - wroteChars: ${wroteChars}`);
    }
}

// Checkt Wortlänge um Prüfbutton einzublenden
function checkWordLength() {
    if (checkedWords === 0 && wroteChars === 4) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if (checkedWords === 1 && wroteChars === 9) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if (checkedWords === 2 && wroteChars === 14) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if (checkedWords === 3 && wroteChars === 19) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if (checkedWords === 4 && wroteChars === 24) {
        checkbutton.style.visibility = 'visible';
        needToCheck = true;
    } else if (checkedWords === 5 && wroteChars === 29) {
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
                setTimeout(() => {
                    gameMessage('win', 'green');
                    document.getElementById("modalWindow").classList.add("active");
                }, 1000);
            } else {
                if (checkedWords === 5) {
                    setTimeout(() => {
                        gameMessage('loose', 'red');
                        document.getElementById("modalWindow").classList.add("active");
                    }, 2000);
                }
            }
        }
    }

    if (wordExists === true) {
        checkLetters();
    } else {
        alert('Das Wort wurde nicht gefunden');
    }
});



function checkLetters() {
    let stillGreen = [];
    for (let i = 0; i <= 4; i++) {
        if (searchedWord.includes(currentWord[i])) {
            if (stillGreen.includes(idLogger[i])) {
                console.log('Bereits grün');
                document.getElementById(tileLogger[i]).style.backgroundColor = 'orange';
            } else {
                console.log('vorhanden aber woanders');
                // Buchstaben orange färben
                document.getElementById(idLogger[i]).style.backgroundColor =
                    'orange';
                // Buchstabe bei Wort orange färben
                document.getElementById(tileLogger[i]).style.backgroundColor = 'orange';
            }
        } else {
            console.log('Buchstabe nicht vorhanden');
            document.getElementById(idLogger[i]).style.backgroundColor = 'grey';
            document.getElementById(tileLogger[i]).style.backgroundColor = 'grey';
        }
        // Richtiger Buchstabe an gleicher Stelle?
        if (currentWord[i] === searchedWord[i]) {
            stillGreen.push(idLogger[i]);
            // Buchstaben grün färben
            document.getElementById(idLogger[i]).style.backgroundColor = 'green';
            // Buchstabe bei Wort grün färben
            document.getElementById(tileLogger[i]).style.backgroundColor = 'green';
        }
    }

    idLogger = [];
    tileLogger = [];
    checkedWords++;
    needToCheck = false;
    checkbutton.style.visibility = 'hidden';
    currentWord = '';
}


continueButton.addEventListener("click", () => {
    document.getElementById("modalWindow").classList.remove("active");
    showAnimation();
    setTimeout(() => {
        renderCredits();
    }, 2000);
    setTimeout(() => {
        reset();
    }, 3000);
});

function showAnimation() {
    animationLbl.classList.add("active");
    animationLbl.innerHTML = lastPoints + ' $';
}

function reset() {
    location.reload();
}

function gameMessage(status, color) {
    const h2Message = document.getElementById("status");
    const message = document.getElementById("msg");
    if (status === 'win') {
        const points = parseInt(10 / checkedWords);
        lastPoints = points;
        creditObj.credits += points;
        creditObj.level += 1;
        save_into_LocalStorage();
        h2Message.innerHTML = "Richtiiig";
        message.innerHTML = `Du erhälst ${points} Punkte`;
    } else {
        h2Message.innerHTML = "GAME OVER";
        message.innerHTML = `Gesucht wurde das Wort: "${searchedWord}"`;
    }

    h2Message.style.color = color;
    message.style.color = color;
}


function load_from_LocalStorage() {
    if (localStorage.getItem('stored_CreditObj') !== null) {
        creditObj = JSON.parse(localStorage.getItem('stored_CreditObj'));
        renderCredits();
    }
}

const save_into_LocalStorage = () => {
    localStorage.setItem('stored_CreditObj', JSON.stringify(creditObj));
};


function renderCredits() {
    lblCredits.innerHTML = creditObj.credits + ' $';
    lblLevel.innerHTML = 'Lv. ' + creditObj.level;
}

// Joker
lblCredits.addEventListener("click", () => {

    if (creditObj.credits >= 3) {
        const confirm = window.confirm("Den nächsten Buchstabe für 3 $ aufdecken?");
        if (confirm) {
            creditObj.credits -= 3;
            save_into_LocalStorage();
            renderCredits();
            let maxCharIndex = 4;
            if (checkedWords === 1) {
                maxCharIndex = 9;
            }
            if (checkedWords === 2) {
                maxCharIndex = 14;
            }
            if (checkedWords === 3) {
                maxCharIndex = 19;
            }
            if (checkedWords === 4) {
                maxCharIndex = 24;
            }
            if (checkedWords === 5) {
                maxCharIndex = 29;
            }
            let counter = -1;
            for (let i = (maxCharIndex - 4); i < maxCharIndex + 1; i++) {
                counter++;
                if (document.getElementById('char_' + (i)).innerHTML === '') {
                    document.getElementById('char_' + (i)).innerHTML = searchedWord[counter];

                    idLogger.push(`btn_${i}`);
                    tileLogger.push('char_' + (i))
                    currentWord = currentWord += searchedWord[counter];
                    wroteChars++;
                    checkWordLength();
                    break;
                }
            }
        } 
    }else {
        alert("Mindestens 3 $ erforderlich!");
    }
});