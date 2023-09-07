/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
let seconds;
let isWorkSession;
let timerId;
const workDuration = 1500;
const breakDuration = 300;

const init = () => {
  isWorkSession = true;
  seconds = workDuration;
};
init();

const endOfTimer = () => {
  clearInterval(timerId);
  if (isWorkSession) {
    isWorkSession = false;
    seconds = breakDuration;
    self.postMessage({ action: 'workEnded', seconds });
  } else {
    isWorkSession = true;
    seconds = workDuration;
    self.postMessage({ action: 'breakEnded', seconds });
  }
};

const countdown = () => {
  if (seconds === 1) {
    endOfTimer();
  } else {
    seconds--;
    self.postMessage({ action: 'tick', remainingTime: seconds });
  }
};

const startTimer = () => {
  timerId = setInterval(countdown, 1000);
};

self.addEventListener('message', (event) => {
  if (event.data.action === 'start') {
    startTimer();
  }
});
