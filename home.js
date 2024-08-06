

const btnContainer = document.querySelector('.board');
const allBoxes = document.querySelectorAll('.box');
const xPlayerDOM = document.querySelector('.xPlayer');
const oPlayerDOM = document.querySelector('.oPlayer');
const restartBtn = document.querySelector('button');
const tieDOM = document.querySelector('.tie');

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
let board = [];
let xCount = 0;
let oCount = 0;


function gameStart() {
    for (let i = 0; i < allBoxes.length; i++) {
        const eventHandler = () => {
            if (allBoxes[i].textContent !== '') {
                return;
            }
            if (isGameOver !== true) {
                allBoxes[i].textContent = checkBox();
                checkWin(currPlayer);
                checkTie();
            }
        }
        allBoxes[i].addEventListener('click', eventHandler);
    }
}

gameStart();

restartBtn.addEventListener('click', () => {
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].textContent = '';
        currPlayer = 'X';
        board = [];
        isGameOver = false;
        tieDOM.textContent = '';
    }
});



function checkBox() {
    if (currPlayer === 'X') {
        currPlayer = 'O';
        board.push('X')
        return 'X';
    } else if (currPlayer === 'O') {
        currPlayer = 'X';
        board.push('O')
        return 'O'
    }
}

function checkWin() {
    for (let i = 0; i < winCombo.length; i++) {
        const [a, b, c] = winCombo[i];
        if (allBoxes[a].textContent === 'X' && allBoxes[b].textContent === 'X' && allBoxes[c].textContent === 'X') {
            xCount += 1;
            xPlayerDOM.textContent = `${xCount}`;
            isGameOver = true;

        } else if (allBoxes[a].textContent === 'O' && allBoxes[b].textContent === 'O' && allBoxes[c].textContent === 'O') {
            oCount += 1
            oPlayerDOM.textContent = `${oCount}`;
            isGameOver = true;
        }
    }
    return isGameOver;
}

function checkTie() {
    if (board.length === 9) {
        isGameOver = true;
        tieDOM.textContent = ' Its a tie!';
    }
}






