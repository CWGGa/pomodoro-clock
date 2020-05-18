$(document).ready(function () {
    var pomodorDisplay = {
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
        breakInnerValue < 60 ? breakLength.innerHTML = breakInnerValue + 1 : breakLength.innerHTML = 60;
    });

    breakDecrement.addEventListener('click', function () {
        var breakInnerValue = parseInt(breakLength.innerHTML);
        breakInnerValue > 1 ? breakLength.innerHTML = breakInnerValue - 1 : breakLength.innerHTML = 1
    });

    sessionIncrement.addEventListener('click', function () {
        var sessionInnerValue = parseInt(sessionLength.innerHTML);
        sessionLength.innerHTML = sessionInnerValue + 1;
        sessionInnerValue < 60 ? sessionLength.innerHTML = breakInnerValue + 1 : sessionLength.innerHTML = 60;
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
        } else if (pomodorDisplay['pause'] === 'reset') {
            pomodorDisplay.pause = 'play'
            countDown();
        }
    });

    resetButton.addEventListener('click', function () {
        pomodorDisplay.pause = 'reset'
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

                if (getMin === 0 && getSec === 0) {
                    audioPlay.play();
                    switch (pomodorDisplay['playing']) {
                        case 'session':
                            pomodorDisplay.playing = 'break';
                            pomodoroTitle.innerHTML = 'Break';
                            if (breakLength.innerHTML >= 1 && breakLength.innerHTML < 10) {
                                timeLeft.innerHTML = `0${breakLength.innerHTML}:00`;
                            } else {
                                timeLeft.innerHTML = `${breakLength.innerHTML}:00`;
                            }
                            $('#timer-label').css('color', '#FFFF')
                            $('#time-left').css('color', '#030303')
                            countDown();
                            break;
                        case 'break':
                            pomodorDisplay.playing = 'session';
                            pomodoroTitle.innerHTML = 'Session';
                            if (sessionLength.innerHTML >= 1 && sessionLength.innerHTML < 10) {
                                timeLeft.innerHTML = `0${sessionLength.innerHTML}:00`;
                            } else {
                                timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
                            }
                            $('#timer-label').css('color', '#FFFF')
                            $('#time-left').css('color', '#030303')
                            countDown();
                            break;
                        default:
                    }
                } else {
                    if (getMin !== 0 && getSec === 0) {
                        if (getMin >= 1 && getMin <= 10) {
                            timeLeft.innerHTML = `0${getMin-1}:59`;
                        } else {
                            timeLeft.innerHTML = `${getMin - 1}:59`;
                        }
                    } else if ((getMin >= 1 && getMin < 10) && (getSec >= 1 && getSec < 10)) {
                        timeLeft.innerHTML = `0${getMin}:0${getSec- 1 }`;
                    } else if ((getMin >= 1 && getMin <= 10) && (getSec >= 1 && getSec <= 10)) {
                        timeLeft.innerHTML = `0${getMin}:0${getSec-1}`;
                    } else if ((getMin >= 1 && getMin <= 10) && !(getSec >= 1 && getSec <= 10)) {
                        timeLeft.innerHTML = `0${getMin}:${getSec-1}`;
                    } else if (getMin === 0 && getSec != 0) {
                        if (getSec >= 1 && getSec <= 10) {
                            timeLeft.innerHTML = `00:0${getSec - 1}`;
                        } else {
                            timeLeft.innerHTML = `00:${getSec - 1}`;
                        }
                    } else if (getMin === 0 && (getSec >= 1 && getSec <= 10)) {
                        timeLeft.innerHTML = `00:0${getSec-1}`;
                    } else if (getMin >= 10 && (getSec >= 1 && getSec <= 10)) {
                        timeLeft.innerHTML = `${getMin}:0${getSec-1}`;
                    } else {
                        timeLeft.innerHTML = `${getMin}:${getSec-1}`;
                    }
                }

                if ((getMin === 1 & getSec <= 1) || (getMin === 0 && (getSec >= 1 && getSec <= 59)) || (getMin === 1 && getSec === 1)) {
                    $('#timer-label, #time-left').css('color', '#FF2424')
                } else if (getMin !== 1) {
                    $('#timer-label').css('color', '#FFFF')
                    $('#time-left').css('color', '#030303')
                }
                countDown();
            }, convertMinToSec)
        } else if (pomodorDisplay['pause'] === 'pause') {
            window.clearTimeout(countIt);
            audioPlay.pause();
        } else if (pomodorDisplay['pause'] === 'reset') {
            sessionLength.innerHTML = '25';
            breakLength.innerHTML = '5';
            timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
            audioPlay.pause();
            audioPlay.src = audioPlay.src;
        }
    }
})