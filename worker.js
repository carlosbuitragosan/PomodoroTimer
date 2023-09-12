/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */

let isWorkSession = true;
let timerId;
const workDuration = 1500;
const breakDuration = 300;
let seconds = workDuration;

const setNextSession = () => {
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
    setNextSession();
  } else {
    seconds--;
    self.postMessage({
      action: 'tick',
      remainingTime: seconds,
      isWorkSession,
      workDuration,
      breakDuration,
    });
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
