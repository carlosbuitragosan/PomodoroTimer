const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startBtn");

let seconds = 0;
let timerInterval;

startButton.addEventListener("click", startTimer);

function startTimer() {
    if (timerInterval) {
        // Timer is already running, do nothing
        return;
    }

    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
}

function updateTimer() {
    seconds++;
    timerElement.textContent = formatTime(seconds);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const paddedMinutes = padZero(minutes);
    const paddedSeconds = padZero(seconds % 60);
    return `${paddedMinutes}:${paddedSeconds}`;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;;;;;
}

console.log('hey')