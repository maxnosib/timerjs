let timerId

// слушаем клики по кнопкам
document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('start');
    var clear = document.getElementById('clear');
    var pause = document.getElementById('pause');

    start.addEventListener('click', function() {
        start.disabled = true;
        pause.disabled = false;
        startTimer()
    }, false);
    clear.addEventListener('click', function() {
        start.disabled = false;
        pause.disabled = false;
        clearClock();
    }, false);
    pause.addEventListener('click', function() {
        start.disabled = false;
        pause.disabled = true;
        pauseClock();
    }, false);

}, false);

// функция для запуска таймера при повторном открытии приложения
function checkLS() {
    if (Number(localStorage.getItem('start_time')) > 0) {
        timerId = setInterval(() => timer(new Date().getTime()), 1000);
    }
    isPause = localStorage.getItem('is_pause') == 'true';
    if (isPause) {
        document.getElementById('pause').disabled = true;
    } else {
        document.getElementById('start').disabled = true;
    }
}
window.onload = checkLS;

// функция подсчета времени
let timer = function(curentTime) {
    startTime = Number(localStorage.getItem('start_time'))
    diffTime = (curentTime - startTime) / 1000
    hour = diffTime / 3600
    if (hour < 1) {
        hour = 0
    } else {
        hour = Math.trunc(hour)
    }
    min = (diffTime - hour * 3600) / 60
    if (min < 1) {
        min = 0
    } else {
        min = Math.trunc(min)
    }
    sec = diffTime - hour * 3600 - min * 60
    sec = Math.trunc(sec)
    readout = hour + ':' + min + ':' + sec;
    isPause = localStorage.getItem('is_pause') == 'true';
    if (!isPause) {
        document.getElementById('stopwatch').value = readout;
    }
}

function startTimer() {
    isPause = localStorage.getItem('is_pause') == 'true';
    difTime = 0
    if (isPause) {
        difTime = Number(localStorage.getItem('diff_time'));
    }
    localStorage.setItem('is_pause', false);
    localStorage.setItem('start_time', new Date().getTime() - difTime);
    timerId = setInterval(() => timer(new Date().getTime()), 1000);
}

// функция для очистки поля
function clearClock() {
    if (Number(localStorage.getItem('start_time')) == 0) {
        return
    }
    clearInterval(timerId);
    localStorage.removeItem('start_time');
    localStorage.removeItem('is_pause');
    localStorage.removeItem('diff_time');
    readout = '0:0:0';
    document.getElementById('stopwatch').value = readout;
}

// функция для паузы
function pauseClock() {
    startTime = Number(localStorage.getItem('start_time'))
    if (startTime == 0) {
        return
    }
    localStorage.setItem('diff_time', new Date().getTime() - startTime);
    localStorage.setItem('is_pause', true);
}