document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('start');
    start.addEventListener('click', function() {
        localStorage.setItem('start_time', new Date().getTime())
        dateObj = new Date();
        StartTIME();
    }, false);
    var clear = document.getElementById('clear');
    clear.addEventListener('click', function() {
        clearClock();
    }, false);
}, false);

function checkLS() {
    if (localStorage.getItem('start_time') != "") {
        dateObj = new Date(Number(localStorage.getItem('start_time')));
        StartTIME();
    }
}
window.onload = checkLS;


//объявляем переменные
var dateObj = new Date();
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
    m = 1,
    tm = 1,
    s = 0,
    ts = 0,
    ms = 0,
    init = 0;



//функция для очистки поля
function clearClock() {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    readout = '00:00:00';
    document.MyForm.stopwatch.value = readout;
}

//функция для старта секундомера
function StartTIME() {
    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) {
        s++;
    }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) {
            ts = ts - ((m - 1) * base);
        }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) {
            tm = tm - ((h - 1) * base);
        }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
        ms = 0;
    }
    if (ms == 0) {
        ms = '00';
    }
    if (ms > 0 && ms <= 9) {
        ms = '0' + ms;
    }
    if (ts > 0) {
        ds = ts;
        if (ts < 10) {
            ds = '0' + ts;
        }
    } else {
        ds = '00';
    }
    dm = tm - 1;
    if (dm > 0) {
        if (dm < 10) {
            dm = '0' + dm;
        }
    } else {
        dm = '00';
    }
    dh = h - 1;
    if (dh > 0) {
        if (dh < 10) {
            dh = '0' + dh;
        }
    } else {
        dh = '00';
    }
    readout = dh + ':' + dm + ':' + ds;
    document.MyForm.stopwatch.value = readout
    clocktimer = setTimeout("StartTIME()", 1);
}