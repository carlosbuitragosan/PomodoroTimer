const startButton = document.querySelector('#startBtn');
const resetButton = document.querySelector('#resetBtn');
const timerEl = document.querySelector('#timer');
const sessionType = document.querySelector('#session-type');
const alarm = new Audio('alarm.mp3');
const worker = new Worker('worker.js');

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const formatSeconds = timeInSeconds % 60;
  return `${minutes}:${formatSeconds < 10 ? '0' : ''}${formatSeconds}`;
};

const toggleSessions = (time, nextSession) => {
  alarm.play();
  timerEl.textContent = formatTime(time);
  sessionType.textContent = nextSession;
  document.title = 'Pomodoro Timer';
  startButton.disabled = false;
};

startButton.addEventListener('click', (event) => {
  worker.postMessage({ action: 'start' });
  event.currentTarget.disabled = true;
});

resetButton.addEventListener('click', () => {
  window.location.reload();
});

worker.addEventListener('message', (event) => {
  if (event.data.action === 'tick') {
    timerEl.textContent = formatTime(event.data.remainingTime);
    document.title = formatTime(event.data.remainingTime);
  }
  if (event.data.action === 'workEnded') {
    const breakDuration = event.data.seconds;
    toggleSessions(breakDuration, 'Break');
  }
  if (event.data.action === 'breakEnded') {
    const workDuration = event.data.seconds;
    toggleSessions(workDuration, 'Focus');
  }
});
