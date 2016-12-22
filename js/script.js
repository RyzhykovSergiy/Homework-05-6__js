
var	t = 0,
		tSart,
		tLocal,
		tDiff,
		disp = [0, 0, 0, 0],
		tLocalSt,
		displayTimer,
		namber = 0;
		pStop = false;
var myUl = document.querySelector('.timer__list');
var addStart = document.querySelector(".start");
var addSplit = document.querySelector(".split");
var addReset = document.querySelector(".reset");
var addTimer = document.querySelector(".timer");

display();

function add() {
	dateLocal();
	tDiff = tLocal - tSart;
	tSart = tLocal;
	t = t + tDiff;
	tDiff = 0;
	millisecondsToTime(t);
	display();
}

//	запис часу сервера Local
function dateLocal() {
	tLocal = +new Date();
}

//	запис часу сервера start
function dateStart() {
	tSart = +new Date();
}

//	запуск старт и стоп
addStart.addEventListener('click', startClick);

//	split
addSplit.addEventListener('click', splitClick);

//reset
addReset.addEventListener('click', resetClick);

function startClick() {
	if (pStop === false) {
		dateStart();
		pStop = true;
		timer();
		addStart.innerHTML = "Stop";
	} else {
		pStop = false;
		addStart.innerHTML = "Start";
		clearInterval(stope);
		namber ++;
		myUl.innerHTML += "<li>" + namber + " Stop: " + displayTimer + '</li>';
	}
}

function splitClick() {
	if (pStop === false) return;
	namber ++;
	myUl.innerHTML += "<li>" + namber + " Split: " + displayTimer + '</li>';
}

function resetClick() {
	t = 0;
	pStop = false;
	addStart.innerHTML = "Start";
	clearInterval(stope);
	disp = [0, 0, 0, 0];
	display();
	myUl.innerHTML = '';
	namber = 0;
}

//	запуск таймера
function timer() {
	if (pStop === true) {
		stope = setInterval(add, 43);
	}
}

//	милисекунды в таймер
function millisecondsToTime(milli) {
	disp[0] = Math.floor((milli / (60 * 60 * 1000)) % 60);
	disp[1] = Math.floor((milli / (60 * 1000)) % 60);
	disp[2] = Math.floor((milli / 1000) % 60);
	disp[3] = milli % 1000;
}

//	вывод на екран
function display() {
	if (disp[3] < 100) {
		if (disp[3] < 10) {
		 disp[3] = '00' + disp[3];
		} else {
			disp[3] = '0' + disp[3];
		} 
	}

	disp[3] = '' + disp[3];

	for (var i = 0 ; i < 3; i++) {
		if (disp[i] <= 9) {
			disp[i] = '0' + disp[i];
		}
		disp[i] = '' + disp[i];
	}

	displayTimer = '' + disp[0] + ':' + disp[1] + ':' + disp[2] + '.' + disp[3];
	addTimer.innerHTML = displayTimer;
}
