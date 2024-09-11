export class NewGame {
    constructor() {
        this.winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        this.boxes = document.querySelectorAll('.box');
        this.isGameOver = false;
        this.currPlayer = 'X';
        this.board = [];
        this.xCount = 0;
        this.oCount = 0;
        this.gameData = [];
        this.gameStart();
        this.restart();



    }

    localData() {
        let data = JSON.parse(localStorage.getItem('gameData'));
        const xPlayerDOM = document.querySelector('.xPlayer');
        const oPlayerDOM = document.querySelector('.oPlayer');
        if (data === null) {
            xPlayerDOM.textContent = 0
            oPlayerDOM.textContent = 0
        } else {
            for (const item of data) {

                xPlayerDOM.textContent = item.x;
                oPlayerDOM.textContent = item.o;
                console.log(item.x);

            }
        }

    }

    gameStart() {
        for (let i = 0; i < this.boxes.length; i++) {
            const eventHandler = () => {
                if (this.boxes[i].textContent !== '') {
                    return;
                }
                if (this.isGameOver !== true) {
                    this.boxes[i].textContent = this.checkBox();
                    this.checkWin();
                    this.checkTie();
                    localStorage.setItem('gameData', JSON.stringify(this.gameData));
                }
            }
            this.boxes[i].addEventListener('click', eventHandler);

        }
    }

    restart() {
        const restartBtn = document.querySelector('button');
        const tieDOM = document.querySelector('.tie');
        restartBtn.addEventListener('click', () => {
            for (let i = 0; i < this.boxes.length; i++) {
                this.boxes[i].textContent = '';
                this.currPlayer = 'X';
                this.board = [];
                this.isGameOver = false;
                tieDOM.textContent = '';
                if (this.boxes[i].classList.contains('winHighlight')) {
                    this.boxes[i].classList.remove('winHighlight');
                }
            }




            this.localData();
        });
    }

    checkBox() {
        if (this.currPlayer === 'X') {
            this.currPlayer = 'O';
            this.board.push('X');
            return 'X';
        } else if (this.currPlayer === 'O') {
            this.currPlayer = 'X';
            this.board.push('O');
            return 'O'
        }
        localStorage.setItem('gameData', JSON.stringify(this.gameData));
    }

    checkWin() {
        for (let i = 0; i < this.winCombos.length; i++) {
            const [a, b, c] = this.winCombos[i];

            if (this.boxes[a].textContent === 'X' && this.boxes[b].textContent === 'X' && this.boxes[c].textContent === 'X') {
                this.xCount++;
                this.isGameOver = true;
                this.boxes[a].classList.add('winHighlight');
                this.boxes[b].classList.add('winHighlight');
                this.boxes[c].classList.add('winHighlight');
                this.gameData = [
                    {
                        x: this.xCount,
                        o: this.oCount,
                    },
                ];
                localStorage.setItem('gameData', JSON.stringify(this.gameData));
            } else if (this.boxes[a].textContent === 'O' && this.boxes[b].textContent === 'O' && this.boxes[c].textContent === 'O') {
                this.oCount++;
                this.isGameOver = true;
                this.boxes[a].classList.add('winHighlight');
                this.boxes[b].classList.add('winHighlight');
                this.boxes[c].classList.add('winHighlight');
                this.gameData = [
                    {
                        x: this.xCount,
                        o: this.oCount,
                    },
                ];
                localStorage.setItem('gameData', JSON.stringify(this.gameData));
            }



        }

        return this.isGameOver;
    }

    checkTie() {
        const tieDOM = document.querySelector('.tie');
        if (this.board.length === 9) {
            this.isGameOver = true;
            tieDOM.textContent = ' Its a tie!';
        }
    }
}