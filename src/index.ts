let param = new URLSearchParams(window.location.search);
let w = param.get("challange");
if (w == null || WORDS.indexOf(revert(w)) == -1) {
	w = convert(WORDS[randInt(0, WORDS.length - 1)]);
	if (param.has("challange")) {
		param.delete("challange");
		window.location.search = param.toString();
	}
}

let wordle = new Wordle(w, []);
let pause = false;

const body = $("body")! as HTMLBodyElement;
const wordle_container = $("#wordle-container")! as HTMLDivElement;
const popupDiv = $("#popup")! as HTMLDivElement;
const popupTitle = $("#popup-title")! as HTMLHeadingElement;
const popupDesc = $("#popup-desc")! as HTMLParagraphElement;
const popupAction = $("#popup-action")! as HTMLButtonElement;
const popupActionsDiv = $("#popup-actions")! as HTMLDivElement;

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
				", font-size 200ms ease-in-out";
			wordle.board[i].push(cl);
			div.appendChild(cl);
		}
		wordle_container.appendChild(div);
	}
	body.addEventListener("keydown", (ev: KeyboardEvent) => {
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
buttons.forEach((e) => {
	e.addEventListener("click", () => {
		switch (e.innerHTML) {
			case "ENTER":
				enterKey();
				break;
			case "BACKSPACE":
				deleteKey();
				break;
			default:
				letterKey(e.innerHTML);
				break;
		}
	});
});

function enterKey() {
	if (pause) return;
	if (wordle.row == 6) return;
	if (wordle.col !== 5) return;
	if (WORDS.indexOf(wordle.getRow().join("")) == -1) {
		popup(
			"Word doesn't exist!",
			"The word you just typed is not in the dictionary (at least in this game)",
			"Okay",
			resetPopup
		);
		return;
	}
	let res = wordle.guess();
	let win = true;
	for (let idx in res) {
		wordle.board[wordle.row][idx].classList.add(res[idx]);
		let letter = wordle.board[wordle.row][idx].innerHTML;
		let key = getKeyByLetter(letter)!;
		if (res[idx] == "correct") {
			key.classList.remove("in-word");
			key.classList.remove("not-in-word");
		} else if (res[idx] == "in-word") {
			if (!key.classList.contains("correct")) {
				key.classList.remove("not-in-word");
			}
		}
		getKeyByLetter(letter)?.classList.add(res[idx]);
		if (res[idx] != "correct") win = false;
	}
	wordle.col = 0;
	if (++wordle.row == 6 || win) {
		winningScreen(win);
	}
	return;
}

function letterKey(letter: string) {
	if (pause) return;
	if (wordle.row == 6) return;
	if (wordle.col == 5) return;
	wordle.board.forEach;
	wordle.board[wordle.row][wordle.col].innerHTML = letter.toUpperCase();
	wordle.board[wordle.row][wordle.col].classList.add("text");
	wordle.col++;
}

function deleteKey() {
	if (pause) return;
	if (--wordle.col < 0) wordle.col = 0;
	wordle.board[wordle.row][wordle.col].innerHTML = "";
	wordle.board[wordle.row][wordle.col].classList.remove("text");
}

function winningScreen(win: boolean) {
	let share = document.createElement("div");
	share.classList.add("popup-action");
	share.innerHTML = "Copy link";
	share.onclick = () => {
		resetPopup();
		popupActionsDiv.removeChild(share);
		navigator.clipboard
			.writeText(
				"https://andndre.github.io/wordle-clone?challange=" + wordle.val
			)
			.then(() => {
				popup(
					"Success",
					"The Link was copied to your Clipboard successfuly!",
					"Okay",
					() => {
						resetPopup();
						wordle.reset();
					}
				);
			})
			.catch(() => {
				popup(
					"Failed",
					"Failed to copy the Link to your Clipboard!",
					"Okay",
					() => {
						resetPopup();
						wordle.reset();
					}
				);
			});
	};
	popupActionsDiv.appendChild(share);
	popup(
		"You " + (win ? "win!" : "lose!"),
		"The correct answer is " + revert(wordle.val),
		"Retry",
		() => {
			resetPopup();
			wordle.reset();
			popupActionsDiv.removeChild(share);
		}
	);
}

function popup(
	title: string,
	desc: string,
	button: string,
	action: () => void = resetPopup
) {
	pause = true;
	popupTitle.innerHTML = title;
	popupDesc.innerHTML = desc;
	popupAction.onclick = action;
	popupAction.innerHTML = button;
	popupDiv.classList.add("active");
}

function $(query: string) {
	return document.querySelector(query);
}

function getKeyByLetter(letter: string) {
	for (let b of buttons) {
		if (b.innerHTML == letter) {
			return b;
		}
	}
	return null;
}

function resetPopup() {
	pause = false;
	popupDiv.classList.remove("active");
}
