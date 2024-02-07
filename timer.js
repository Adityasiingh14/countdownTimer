let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let laps = [];
let int;
let audio = new Audio('audio.mp3');

document.getElementById('startTimer').addEventListener('click', () => {
    int = setInterval(displayTimer, 10);
    audio.play();
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    clearInterval(int);
    audio.pause();
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00 : 000';
    laps = [];
    displayLaps();
    audio.pause();
});

document.getElementById('lapTimer').addEventListener('click', () => {
    let lapTime = `${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds} : ${milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds}`;
    laps.push(lapTime);
    displayLaps();
});
function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timerRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
function displayLaps() {
    let lapsRef = document.querySelector('.lapDisplay');
    lapsRef.innerHTML = '';
    laps.forEach((lap, index) => {
        let lapItem = document.createElement('li');
        lapItem.textContent = `${index + 1} - ${lap}`;

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            laps.splice(index, 1);
            displayLaps();
        });

        lapItem.appendChild(deleteButton);
        lapsRef.appendChild(lapItem);
    });
}