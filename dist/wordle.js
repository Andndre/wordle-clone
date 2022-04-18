"use strict";
class Wordle {
    constructor(val, board) {
        this.col = 0;
        this.row = 0;
        this.val = val;
        this.board = board;
    }
    reset() {
        this.col = 0;
        this.row = 0;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                this.board[i][j].innerHTML = "";
                this.board[i][j].classList.remove("text");
                this.board[i][j].classList.remove("correct");
                this.board[i][j].classList.remove("in-word");
                this.board[i][j].classList.remove("not-in-word");
            }
        }
        for (let b of buttons) {
            b.classList.remove("text");
            b.classList.remove("correct");
            b.classList.remove("in-word");
            b.classList.remove("not-in-word");
        }
        let w = WORDS[randInt(0, WORDS.length - 1)];
        this.val = convert(w);
    }
    getRow() {
        return this.board[this.row].map((val) => val.innerHTML.toUpperCase());
    }
    guess() {
        let c = [];
        let a = Array.from(revert(this.val));
        let b = this.getRow();
        for (let i = 0; i < 5; i++) {
            c[i] = "not-in-word";
        }
        for (let i = 0; i < 5; i++) {
            if (a[i] === b[i]) {
                a[i] = "";
                c[i] = "correct";
            }
        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (a[j] === b[i] && c[i] === "not-in-word") {
                    a[j] = "";
                    c[i] = "in-word";
                }
            }
        }
        return c;
    }
}
