"use strict";
class Wordle {
    constructor(answer, board) {
        this.answer = answer;
        this.board = board;
    }
    row(row) {
        return this.board[row].map((val) => val.innerHTML.toUpperCase());
    }
    guess(row) {
        let result = [];
        let correct = Array.from(this.answer);
        let guess_ = this.row(row);
        // set to not-in-word initially
        for (let i = 0; i < 5; i++) {
            result[i] = "not-in-word";
        }
        // correct
        for (let i = 0; i < 5; i++) {
            if (correct[i] === guess_[i]) {
                correct[i] = "";
                result[i] = "correct";
            }
        }
        // in-word
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (correct[j] === guess_[i] && result[i] === "not-in-word") {
                    correct[j] = "";
                    result[i] = "in-word";
                }
            }
        }
        return result;
    }
}
