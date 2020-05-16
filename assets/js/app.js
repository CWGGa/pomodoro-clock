$(document).ready(function () {
    const pomodorDisplay = {
        session: 25,
        break: 5,
        display: null,
        pause: 'pause',
        playing: 'session'
    }

    var sessionLength = document.getElementById('session-length');
    var breakLength = document.getElementById('break-length');
    var breakIncrement = document.getElementById('break-increment');
    var breakDecrement = document.getElementById('break-decrement');
    var sessionIncrement = document.getElementById('session-increment');
    var sessionDecrement = document.getElementById('session-decrement');
    var timeLeft = document.getElementById('time-left');
    var timeLeftValue = document.getElementById('time-left').innerHTML;
    var getMinute = parseInt(timeLeftValue.split(':')[0]);
    var getSeconds = parseInt(timeLeftValue.split(':')[1]);
    var startButton = document.getElementById('start_stop');
    var audioPlay = document.getElementById('beep');
    var pomodoroTitle = document.getElementById('timer-label');
    var resetButton = document.getElementById('reset');

    sessionLength.innerHTML = pomodorDisplay.session;
    breakLength.innerHTML = pomodorDisplay.break;

    breakIncrement.addEventListener('click', function () {
        var breakInnerValue = parseInt(breakLength.innerHTML);
        breakLength.innerHTML = breakInnerValue + 1;
    });

    breakDecrement.addEventListener('click', function () {
        var breakInnerValue = parseInt(breakLength.innerHTML);
        breakInnerValue > 1 ? breakLength.innerHTML = breakInnerValue - 1 : breakLength.innerHTML = 1
    });

    sessionIncrement.addEventListener('click', function () {
        var sessionInnerValue = parseInt(sessionLength.innerHTML);
        sessionLength.innerHTML = sessionInnerValue + 1;
        if (sessionInnerValue >= 1 && sessionInnerValue <= 8) {
            timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`
        } else {
            timeLeft.innerHTML = `${sessionLength.innerHTML}:00`
        }
    });

    sessionDecrement.addEventListener('click', function () {
        var sessionInnerValue = parseInt(sessionLength.innerHTML);
        sessionInnerValue > 1 ? sessionLength.innerHTML = sessionInnerValue - 1 : sessionLength.innerHTML = 1
        if (sessionInnerValue >= 1 && sessionInnerValue <= 10) {
            timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`
        } else {
            timeLeft.innerHTML = `${sessionLength.innerHTML}:00`
        }
    });


    startButton.addEventListener('click', function () {
        if (pomodorDisplay.pause === 'pause') {
            pomodorDisplay.pause = 'play'
            countDown();
        } else if (pomodorDisplay['pause'] === 'play') {
            pomodorDisplay.pause = 'pause'
            countDown();
        }
    });

    resetButton.addEventListener('click', function () {
        pomodorDisplay.pause = 'pause'
        sessionLength.innerHTML = '25';
        breakLength.innerHTML = '5';
        timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
    });

    function countDown() {
        var convertMinToSec = getMinute * 60;
        var getMin = parseInt(document.getElementById('time-left').innerHTML.split(':')[0]);
        var getSec = parseInt(document.getElementById('time-left').innerHTML.split(':')[1]);

        if (pomodorDisplay['pause'] === 'play') {
            var countIt = setTimeout(function () {
                if (getMin !== 0 && getSec === 00) {

                    if (getMin === 1) {
                        timeLeft.innerHTML = `00:59`
                    } else if (getMin > 1 && getMin < 10) {
                        timeLeft.innerHTML = `0${getMin - 1}:59`;
                    } else {
                        timeLeft.innerHTML = `${getMin - 1}:59`;
                    }
                } else if (getMin !== 0 && getSec !== 0) {
                    if (getMin >= 1 && getMin < 10) {
                        if (getSec >= 1 && getSec <= 10) {
                            timeLeft.innerHTML = `${getMin}:0${getSec - 1}`
                        } else {
                            timeLeft.innerHTML = `0${getMin}:${getSec - 1}`
                        }
                    } else {
                        if (getSec >= 1 && getSec <= 10) {
                            timeLeft.innerHTML = `${getMin}:0${getSec - 1}`
                        } else {
                            timeLeft.innerHTML = `${getMin}:${getSec - 1}`
                        }
                    }
                } else if (getMin === 0 && getSec != 0) {
                    if (getSec >= 1 && getSec <= 10) {
                        timeLeft.innerHTML = `${getMin}:0${getSec - 1}`
                    } else {
                        timeLeft.innerHTML = `00:${getSec - 1}`
                    }
                } else if (getMin === 0 && getSec === 0) {
                    timeLeft.innerHTML = `00:00`
                    audioPlay.play();
                    if (pomodorDisplay.playing === 'session') {
                        pomodorDisplay.display = 'break'
                        pomodoroTitle.innerHTML = 'Break';
                        timeLeft.innerHTML = `${breakLength.innerHTML}:00`;
                    } else if (pomodorDisplay.playing === 'break') {
                        pomodorDisplay.display = 'session'
                        pomodoroTitle.innerHTML = 'Session'
                        timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
                    }
                }
                countDown();
            }, convertMinToSec)
        } else if (pomodorDisplay['pause'] === 'pause') {}
    }
})