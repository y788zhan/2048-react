var results = [{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""},
{val: ""}];

var find = [{key: 0, val:""},
			{key: 1, val:""},
			{key: 2, val:""},
			{key: 3, val:""},
			{key: 4, val:""},
			{key: 5, val:""},
			{key: 6, val:""},
			{key: 7, val:""},
			{key: 8, val:""},
			{key: 9, val:""},
			{key: 10, val:""},
			{key: 11, val:""},
			{key: 12, val:""},
			{key: 13, val:""},
			{key: 14, val:""},
			{key: 15, val:""}];

var gameover = false;


var o = [["", "", "", ""], // first line
		["", "", "", ""], // second line
		["", "", "", ""], // third line
		["", "", "", ""]]; // fourth line


var t = [["", "", "", ""], // first line
		["", "", "", ""], // second line
		["", "", "", ""], // third line
		["", "", "", ""]]; // fourth line

var p = [["", "", "", ""], // first line
		["", "", "", ""], // second line
		["", "", "", ""], // third line
		["", "", "", ""]]; // fourth line
		
var b = [["", "", "", ""], // first line
	     ["", "", "", ""], // second line
	     ["", "", "", ""], // third line
	     ["", "", "", ""]]; // fourth line

function mycomp(a, b) {
	return a.val - b.val;
}

function unsort(a, b) {
	return a.key - b.key;
}

function copy(res1, res2) {
	for (i = 0; i < 16; i++) {
		res2[i].val = res1[i].val;
	}
	res2.sort(mycomp);
}
		 
function two_four() {
	var rand = Math.random();
	var val = 2;
	if (rand > 0.9) {
		val = 4;
	}
	return val;
}

function getc(board) {
	copy(results, find);
	var empty = 0;
	while (empty < 16 && find[empty].val == "") {
		empty += 1;
	}
	if (empty == 0) {
		return false;
	} else {
		var random = find[Math.floor(Math.random() * empty)].key;
		var new_num = two_four();
		board[Math.floor(random / 4)][random % 4] = new_num;
		console.log(new_num, Math.floor(random/4), random%4);
	}
	find.sort(unsort);
}

function notempty(val) {
	return val != "";
}

function closegapright(line) {
	var numbers = line.filter(notempty);
	var empty = 4 - numbers.length;
	while (empty > 0) {
		numbers.unshift("");
		empty -= 1;
	}
	for (i = 0; i < 4; i++) {
		line[i] = numbers[i];
	}
}

function moverightline(line) {
	closegapright(line);
	if (line[3]!= "" && line[3] == line[2]) {
		line[3] *= 2;
		line[2] = "";
	}
	if (line[2] != "" && line[2] == line[1]) {
		line[2] *= 2;
		line[1] = "";
	}
	if (line[1] != "" && line[1] == line[0]) {
		line[1] *= 2;
		line[0] = "";
	}
	closegapright(line);
}

function moveright(board) {
	moverightline(board[0]);
	moverightline(board[1]);
	moverightline(board[2]);
	moverightline(board[3]);
}

function moveleftline(line) {
	line.reverse();
	moverightline(line);
	line.reverse();
}

function moveleft(board) {
	moveleftline(board[0]);
	moveleftline(board[1]);
	moveleftline(board[2]);
	moveleftline(board[3]);
}

function transpose(from, to) {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			to[i][j] = from[j][i];
		}
	}
}

function moveup(board, temp) {
	transpose(board,temp);
	moveleft(temp);
	transpose(temp, board);
}

function movedown(board, temp) {
	transpose(board, temp);
	moveright(temp);
	transpose(temp, board);
}

function board_equal(b1, b2) {
	var equal = true;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if (b1[i][j] != b2[i][j]) {
				return false;
			}
		}
	}
	return equal;
}

function apply(board, res) {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			res[i * 4 + j].val = board[i][j];
		}
	}
}

function myreset(board) {
	for (i = 0; i < 4; i ++) {
		for (j = 0; j < 4; j++) {
			board[i][j] = "";
		}
	};
	getc(board);
	apply(board, results);
	getc(board);
	apply(board, results);
}

function cont(orig, board, temp) {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			orig[i][j] = board[i][j];
		}
	}
	moveright(board);
	var right = board_equal(orig, board);
	moveleft(board);
	var left = board_equal(orig, board);
	moveup(board, temp);
	var up = board_equal(orig, board);
	movedown(board, temp);
	var down = board_equal(orig, board);
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			board[i][j] = orig[i][j];
		}
	}
	return !(right && left && up && down);
}

function print_results(res) {
	for (i = 0; i < 16; i++) {
		console.log(res[i].val);
	}
}		

function mycontinue(board, prev, temp, orig, command) {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			prev[i][j] = board[i][j];
		}
	}
	if (cont(orig, board, temp)) {
		if (command == "w") {
			moveup(board, temp);
			apply(board, results);
		} else if (command == "a") {
			moveleft(board);
			apply(board, results);
		} else if (command == "s") {
			movedown(board, temp);
			apply(board, results);
		} else if (command == "d") {
			moveright(board);
			apply(board, results);
		}
		if (!(board_equal(prev, board))) {
			getc(board);
		}
		apply(board, results);
	} else {
		gameover = true;
	}
}