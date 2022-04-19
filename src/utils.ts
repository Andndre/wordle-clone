function randInt(a: number, b: number) {
	return Math.floor(Math.random() * (b - a + 1)) + a;
}

function to_num(w: string) {
	let res = 0;
	for (let i = 0; i < w.length; i++) {
		res += ord(w[i]) * 100 ** (w.length - i - 1);
	}
	return res;
}

function to_word(num: number) {
	let res = "";
	while (num > 0) {
		res = chr(num % 100) + res;
		num = Math.floor(num / 100);
	}
	return res;
}

function convert(word: string): string {
	return atbash(ascii_Convert(to_num(word)));
}

function revert(str: string): string {
	return to_word(ascii_Revert(atbash(str)));
}

function atbash(str: string) {
	str = str.toUpperCase();
	let result = "";
	for (let n of str) {
		result += chr(27 - (ord(n) - 64) + 64);
	}
	return result;
}

function ascii_Convert(int: number) {
	let m = 1;
	let order_letter = 0;
	let result = "";
	while (true) {
		order_letter = Math.floor((int % 26 ** m) / 26 ** (m - 1));
		if (order_letter != 0) {
			int -= order_letter * 26 ** (m - 1);
			result = chr(order_letter + 64) + result;
		} else {
			int -= 26 ** m;
			result = "Z" + result;
		}
		if (int == 0) break;
		m += 1;
	}
	return result;
}

function ascii_Revert(str: string) {
	str = str.toUpperCase();
	let a = 0;
	for (let i = str.length - 1; i >= 0; i--) {
		a += (ord(str[i]) - 64) * 26 ** (str.length - i - 1);
	}
	return a;
}

function ord(str: string) {
	return str.charCodeAt(0);
}

function chr(ord: number) {
	return String.fromCharCode(ord);
}

function str_binarySearch(arr: string[], x: string): number {
	let l = 0;
	let r = arr.length - 1;
	while (l <= r) {
		let m = l + Math.floor((r - l) / 2);
		let res = -1000;
		if (x == arr[m]) res = 0;
		if (res == 0) return m;
		if (str_greatherThan(x, arr[m])) l = m + 1;
		else r = m - 1;
	}
	return -1;
}

function str_greatherThan(a: string, b: string) {
	return a.localeCompare(b) > 0;
}

function sleep(millisecondsDuration: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, millisecondsDuration);
	});
}
