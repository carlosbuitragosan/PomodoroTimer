import './side-menu.js';

const startButton = document.querySelector('.button_start');
const resetButton = document.querySelector('.button_reset');
export const timerEl = document.querySelector('.clock');
const sessionType = document.querySelector('.title__session-type');
const alarm = new Audio('alarm.mp3');
export const worker = new Worker('worker.js');
const semicircleIndex2 = document.querySelector('.semicircle__index2');
const semicircleIndex3 = document.querySelector('.semicircle__index3');
const semicircleIndex4 = document.querySelector('.semicircle__index4');
let UIAngleIncrement;
let UIAngle = 0;

export const formatTime = (timeInSeconds) => {
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

resetButton.addEventListener('click', () => {
  window.location.reload();
});

startButton.addEventListener('click', (event) => {
  event.currentTarget.disabled = true;
  worker.postMessage({ action: 'start' });
});

const graphicIndicator = (isWorkSession, workDuration, breakDuration) => {
  if (isWorkSession) {
    UIAngleIncrement = 360 / workDuration;
  } else {
    UIAngleIncrement = 360 / breakDuration;
  }
  UIAngle += UIAngleIncrement;
  semicircleIndex2.style.transform = `rotate(${UIAngle}deg)`;
  semicircleIndex3.style.transform = `rotate(${UIAngle}deg)`;
  if (UIAngle > 180) {
    semicircleIndex3.style.transform = 'rotate(180deg)';
    semicircleIndex4.style.display = 'none';
  }
};

const SwitchSessions = (action, seconds) => {
  if (action === 'workEnded') {
    const breakDuration = seconds;
    toggleSessions(breakDuration, 'Break');
    semicircleIndex2.style.transform = 'rotate(0deg)';
    semicircleIndex3.style.transform = 'rotate(0deg)';
    semicircleIndex4.style.display = 'block';
    UIAngle = 0;
  }
  if (action === 'breakEnded') {
    const workDuration = seconds;
    toggleSessions(workDuration, 'Focus');
    semicircleIndex2.style.transform = 'rotate(0deg)';
    semicircleIndex3.style.transform = 'rotate(0deg)';
    semicircleIndex4.style.display = 'block';
    UIAngle = 0;
  }
};

worker.addEventListener('message', (event) => {
  if (event.data.action === 'tick') {
    timerEl.textContent = formatTime(event.data.remainingTime);
    document.title = formatTime(event.data.remainingTime);
    graphicIndicator(
      event.data.isWorkSession,
      event.data.workDuration,
      event.data.breakDuration
    );
  }
  SwitchSessions(event.data.action, event.data.seconds);
});
