const timerElement = document.getElementById('timer');
const sessionTypeElement = document.getElementById('sessionType');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const alarmSound = new Audio('alarm.mp3'); // Replace "alarm.mp3" with the path to your alarm sound file

let timerInterval; // Declare timerInterval variable outside the functions
let isWorkSession = true; // current session (work/break)
const workDuration = 1500; // 25min
const breakDuration = 300; // 5min
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
    updateSessionType('Focus');
  } else {
    seconds = breakDuration;
    updateSessionType('Break');
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
      updateSessionType('Break');
    } else {
      isWorkSession = true;
      seconds = workDuration;
      timerElement.textContent = formatTime(seconds);
      updateSessionType('Focus');
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

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateSessionType('Focus');

// CONTINUE TIMER WHEN PAGE BECOMES HIDDEN

let elapsedTime = 0;
let timeStampOnHidden = 0;
let isPageHidden = false;
document.addEventListener('visibilitychange', () => {
  // check if timer is running
  if (timerInterval) {
    if (document.visibilityState === 'hidden' && isPageHidden) {
      isPageHidden = true;
      timeStampOnHidden = Date.now();
      console.log('timeStamp', Math.floor(timeStampOnHidden / 1000));
      clearInterval(timerInterval); // stop the timer
      elapsedTime = seconds; // store the time left when page becomes hidden
      console.log(formatTime(seconds));
      timerInterval = undefined; // indicaates timer isn't running
    }
  } else if (document.visibilityState === 'visible' && isPageHidden) {
    isPageHidden = true;
    const timeStampOnVisible = Date.now();
    console.log('timeStampOnVisible', Math.floor(timeStampOnVisible / 1000));
    const totalTimeHidden = timeStampOnVisible - timeStampOnHidden; // time the page was hidden
    console.log(
      'totalTimeHidden(timeStampOnVisible - timeStampOnHidden)',
      Math.floor(totalTimeHidden / 1000)
    );

    seconds = Math.max(0, elapsedTime - Math.floor(totalTimeHidden / 1000));
    timerInterval = setInterval(updateTimer, 1000);
  }
});

// document.addEventListener('visibilityChange', () => {
//   const state = document.visibilityState;
//   if (state === 'visible') console.log('page is visible');
//   else if (state === 'hidden') console.log('page is not visible');
// });
