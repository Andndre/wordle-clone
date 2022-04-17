"use strict";
// TODO: Get word from user through URL search params (hashed), e.g. ?word=6f8a8eb5f2d0
// TODO: If the URL search param is missing, use a random word from the dictionary, then hash it and redirect to the new URL
// let param = new URLSearchParams(window.location.search);
let word = WORDS[randInt(0, WORDS.length - 1)];
let wordle = new Wordle(word, []);
let end = false;
let row = 0;
let col = 0;
const body = document.querySelector("body");
const wordle_container = document.getElementById("wordle-container");
window.onload = () => {
    for (let i = 0; i < 6; i++) {
        wordle.board.push([]);
        let div = document.createElement("div");
        for (let j = 0; j < 5; j++) {
            let cl = document.createElement("div");
            let delay = j * 100 + "ms";
            cl.style.transition =
                "color 500ms ease-out " +
                    delay +
                    ", transform 700ms ease-out " +
                    delay +
                    ", font-size 75ms ease-in-out";
            wordle.board[i].push(cl);
            div.appendChild(cl);
        }
        wordle_container.appendChild(div);
    }
    body.addEventListener("keydown", (ev) => {
        if (ev.key == "Backspace" || ev.key == "Delete") {
            deleteKey();
            return;
        }
        if (ev.key == "Enter") {
            enterKey();
            return;
        }
        if (ev.key.match(/[a-z]/i) && ev.key.length == 1) {
            letterKey(ev.key);
            return;
        }
    });
};
let buttons = Array.from(document.getElementsByClassName("key"));
console.log(buttons);
buttons.forEach((e) => {
    e.addEventListener("click", () => {
        console.log("hello");
        switch (e.innerHTML) {
            case "ENTER":
                enterKey();
                break;
            case "DEL":
                deleteKey();
                break;
            default:
                letterKey(e.innerHTML);
                break;
        }
    });
});
function enterKey() {
    if (end)
        return;
    if (row == 6)
        return;
    if (col !== 5)
        return;
    if (WORDS.indexOf(wordle.row(row).join("")) == -1) {
        alert("Word doesn't exist!");
        return;
    }
    let res = wordle.guess(row);
    let win = true;
    for (let idx in res) {
        wordle.board[row][idx].classList.add(res[idx]);
        if (res[idx] != "correct")
            win = false;
    }
    col = 0;
    if (++row == 6 || win) {
        end = true;
        winningScreen(win);
    }
    return;
}
function letterKey(letter) {
    if (end)
        return;
    if (row == 6)
        return;
    if (col == 5)
        return;
    wordle.board[row][col].innerHTML = letter.toUpperCase();
    wordle.board[row][col].classList.add("text");
    col++;
}
function deleteKey() {
    if (end)
        return;
    if (--col < 0)
        col = 0;
    wordle.board[row][col].innerHTML = "";
    wordle.board[row][col].classList.remove("text");
}
function winningScreen(win) {
    alert("You " + (win ? "win!" : "lost!"));
}
