const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const alarmSound = new Audio("alarm.mp3"); // Replace "alarm.mp3" with the path to your alarm sound file

let timerInterval; // Declare timerInterval variable outside the functions
let seconds = 15; // Set the initial value to 25 minutes (25 minutes * 60 seconds = 1500 seconds)

function startTimer() {
    if (timerInterval) {
        // Timer is already running, do nothing
        return;
    }

    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval); // Stop the timer
    timerInterval = null;
    seconds = 1500; // Reset seconds to 25 minutes
    timerElement.textContent = formatTime(seconds);
    startButton.disabled = false;
    alarmSound.pause(); // Pause the alarm sound if it is playing
    alarmSound.currentTime = 0; // Reset the alarm sound playback position
}

function updateTimer() {
    if (seconds === 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        startButton.disabled = false; // Enable the start button
        playAlarm(); // Play the alarm sound
        return;
    }

    seconds--;
    timerElement.textContent = formatTime(seconds);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const paddedMinutes = padZero(minutes);
    const paddedSeconds = padZero(seconds % 60);
    return `${paddedMinutes}:${paddedSeconds}`;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function playAlarm() {
    alarmSound.play();
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
