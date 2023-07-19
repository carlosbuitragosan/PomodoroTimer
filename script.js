const timerElement = document.getElementById("timer");
const sessionTypeElement = document.getElementById("sessionType");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const alarmSound = new Audio("alarm.mp3"); // Replace "alarm.mp3" with the path to your alarm sound file

let timerInterval; // Declare timerInterval variable outside the functions
let isWorkSession = true; // current session (work/break)
let workDuration = 1500; // 25min
let breakDuration = 300; // 5min
let seconds = workDuration;


function startTimer() {
    if (timerInterval) {
        // Timer is already running, do nothing
        return;
    }

    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    Notification.requestPermission();
}


function resetTimer() {
    clearInterval(timerInterval); // Stop the timer
    timerInterval = null;

    if (isWorkSession) {
        seconds = workDuration;
        updateSessionType("Work");

    } else {
        seconds = breakDuration;
        updateSessionType("Break");
    }
    timerElement.textContent = formatTime(seconds);
    startButton.disabled = false;
    alarmSound.pause(); // Pause  alarm  if it is playing
    alarmSound.currentTime = 0; // Reset alarm 
}

function updateTimer() {
    if (seconds === 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        timerInterval = null;
        playAlarm(); // Play the alarm sound

        if (isWorkSession) {
            isWorkSession = false;
            seconds = breakDuration;
            timerElement.textContent = formatTime(seconds);
            updateSessionType("Break");
        } else {
            isWorkSession = true;
            seconds = workDuration;
            timerElement.textContent = formatTime(seconds);
            updateSessionType("Work");
        }

        startButton.disabled = false; // Enable the start button
        resetButton.disabled = false;
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

function updateSessionType(session) {
    sessionTypeElement.textContent = session;
}

function playAlarm() {
    alarmSound.play();
}


startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);


updateSessionType("Work");

