

const btnContainer = document.querySelector('.board');
let allBoxes = document.querySelectorAll('.box');
const scoreDOM = document.querySelector('.scoreBoard');
const button1DOM = document.getElementById('0');
const button2DOM = document.getElementById('1');
const button3DOM = document.getElementById('2');
const button4DOM = document.getElementById('3');
const button5DOM = document.getElementById('4');
const button6DOM = document.getElementById('5');
const button7DOM = document.getElementById('6');
const button8DOM = document.getElementById('7');
const button9DOM = document.getElementById('8');

const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];


let currPlayer = 'X';
let isGameOver = false;
let XData = [];
let OData = [];

for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('click', e => {
        if (allBoxes[i].textContent !== '') {
            return;
        }
        allBoxes[i].textContent = checkBox();


        checkWin(currPlayer);
        // checkTie();
    });

}

function checkBox() {
    if (currPlayer === 'X') {
        currPlayer = 'O';
        return 'X';
    } else if (currPlayer === 'O') {
        currPlayer = 'X';
        return 'O'
    }
}

function checkWin() {
    for (let i = 0; i < winCombo.length; i++) {
        const [a, b, c] = winCombo[i];
        if (allBoxes[a].textContent === 'X' && allBoxes[b].textContent === 'X' && allBoxes[c].textContent === 'X') {
            scoreDOM.textContent = 'X player wins!';
            isGameOver = true;

        } else if (allBoxes[a].textContent === 'O' && allBoxes[b].textContent === 'O' && allBoxes[c].textContent === 'O') {
            scoreDOM.textContent = 'O player wins!';
            isGameOver = true;
        }

    }
    if (isGameOver === true) {
        for (let j = 0; j < allBoxes.length; j++) {
            allBoxes[j].replaceWith(allBoxes[j].cloneNode(true));
        }
    }
    return false;
}

// function checkTie() {


// }


