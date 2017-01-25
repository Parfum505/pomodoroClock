	var timeShow = document.getElementById('time'),
		startButton = document.getElementById('startButton'),
		secondsRemainPomodoro,
		secondsRemainRelax,
		handlerPomodoro,	//Pomodoro setInterval name
		handlerRelax,	//Relax setInterval name
		height = 0,		//height of background div (red or green)
		timePomodoro = 25,	//set initial time of work
		timeRelax = 5,	//set initial time of relax
		setPomodoro = true;	//switch for setPomodoro&setRelax buttons

	//fade out function for buttons + & -
function fadeOut(id) {
	var item = document.getElementById(id),
		opacity = 1;
	var fadeOutHandler = setInterval(function() {
		if (opacity <= 0) {
			clearInterval(fadeOutHandler);
			item.style.display = 'none';
		}
		opacity -= 0.2;
		item.style.opacity = opacity;
	}, 20);
}
	//fade in function for buttons + & -
function fadeIn(id) {
	var item = document.getElementById(id);
	item.style.opacity = 1;
	item.style.display = "inline-block";
}
	//reset all settings after breaking (stop-button)
function resetPage() {
	if (handlerRelax) {
		clearInterval(handlerRelax);
	}
	if (handlerPomodoro) {
		clearInterval(handlerPomodoro);
	}
	height = 0;
	timeShow.innerHTML = timePomodoro < 10 ? "0" + timePomodoro+ ":00" : timePomodoro+ ":00";
	fadeIn("increase");
	fadeIn("decrease");
	// fadeIn("inputArea");
	document.querySelector('h1').classList.add('text-shadow-animation'); //add animation after breaking
	setTimeout(function() {
		document.querySelector('h1').classList.remove('text-shadow-animation'); //del animation after 1.5s
		}, 1500);
	document.getElementById('back').style.height = 0;	//resetting bg
	document.getElementById('back').style.backgroundColor = "red";
}
	//Relax counting down and initial. of Pomodoro counting down function
function tickRelax() {
	var min = Math.floor(secondsRemainRelax / 60),
		sec = secondsRemainRelax - (min * 60);

	if (min < 10) { min = "0" + min; }
	if (sec < 10) { sec = "0" + sec; }

	timeShow.innerHTML = min + ":" + sec; //shows Relax-time left
//when Relax-counting is finished
	if (secondsRemainRelax === 0) {
		clearInterval(handlerRelax);
		document.querySelector('.bell').play(); //init. bell sound
		height = 0;
		document.getElementById('back').style.backgroundColor = "red"; //changing bg-color for Pomodoro-counting
		secondsRemainPomodoro = Number(timePomodoro) * 60 -1; //set remaining time for Pomodoro
		handlerRelax = setInterval(tickPomodoro, 1000) //init Pomodoro-counting
	}
	secondsRemainRelax--;

	height += 100 / (timeRelax * 60 ); //animation of bg
	document.getElementById('back').style.height = height + "%";
}
	//Pomodoro countdown and initial. of Relax countdown function
function tickPomodoro() {
	var min = Math.floor(secondsRemainPomodoro / 60),
		sec = secondsRemainPomodoro - (min * 60);

	if (min < 10) { min = "0" + min; }
	if (sec < 10) { sec = "0" + sec; }

	timeShow.innerHTML = min + ":" + sec; //shows Pomodoro-time left
	//when Pomodoro-counting is finished
	if (secondsRemainPomodoro === 0) {
		clearInterval(handlerPomodoro);
		document.querySelector('.bell').play(); //init. bell sound
		height = 0;
		document.getElementById('back').style.backgroundColor = "green"; //changing bg-color for Relax-counting
		secondsRemainRelax = Number(timeRelax) * 60 -1; //set remaining time for Relax
		handlerRelax = setInterval(tickRelax, 1000) //init Relax-counting
	}

	secondsRemainPomodoro--;
	height += 100 / (timePomodoro * 60 ); //animation of bg
	document.getElementById('back').style.height = height + "%";
}

function startCountdown () {
	secondsRemainPomodoro = Number(timePomodoro) * 60 -1; //set remaining time for Pomodoro
	handlerPomodoro = setInterval(tickPomodoro, 1000);
}

	//set initial-time of Pomodoro && Relax
document.getElementById('increase').onclick = function () {
	var time;
	if (setPomodoro) {//switch on setting Pomodoro-time
		timePomodoro++;
		if (timePomodoro > 60) {
			timePomodoro = 60;
		}
		time = timePomodoro;
	} else if (!setPomodoro) {//switch on setting Relax-time
		timeRelax++;
		if (timeRelax > 60) {
			timeRelax = 60;
		}
		time = timeRelax;
	}

	if (time < 10) {
		time = "0" + time;
	}
	timeShow.innerHTML = time + ":00"; //shows init. time
	document.querySelector('.tik').currentTime = 0;//sound effects of buttons
	document.querySelector('.tik').play();
};
//set initial-time of Pomodoro && Relax
document.getElementById('decrease').onclick = function () {
	var time;
	if (setPomodoro) {//switch on setting Pomodoro-time
		timePomodoro--;
		if (timePomodoro < 1) {
			timePomodoro = 1;
		}
		time = timePomodoro;
	} else if (!setPomodoro) {//switch on setting Relax-time
		timeRelax--;
		if (timeRelax < 1) {
			timeRelax = 1;
		}
		time = timeRelax;
	} else return;
	if (time < 10) {time = "0" + time;}

	timeShow.innerHTML = time + ":00"; //shows init. time
	document.querySelector('.tik').currentTime = 0;//sound effects of buttons
	document.querySelector('.tik').play();
};
	//events of Set Pomodoro-, Set Relax- and Stop- buttons
startButton.onclick = function () {

		if (startButton.value === "Stop" && !setPomodoro) {//init break with stop button
			document.querySelector('.stop').play(); //sound effect if break
			resetPage();
			setPomodoro = true; //reset switch for Set Pomodoro button
			startButton.value = "Set Pomodoro";
		} else if (setPomodoro) {
			document.querySelector('.tik').play();
			setPomodoro = false; //switch for Set Relax button
			timeShow.innerHTML = timeRelax < 10 ? "0" + timeRelax+ ":00" : timeRelax+ ":00";
			startButton.value = "Set Relax";
			startButton.style.backgroundColor = "#7d75f6";
		} else if (!setPomodoro) { //switch for Stop button
			timeShow.innerHTML = timePomodoro < 10 ? "0" + timePomodoro+ ":00" : timePomodoro+ ":00";
			document.querySelector('.tik').play();
			fadeOut('increase'); //fade out + && - buttons
			fadeOut('decrease');
			startCountdown(); //init count down
			startButton.value = "Stop";
			startButton.style.backgroundColor = "#60be56";//
		}
};

