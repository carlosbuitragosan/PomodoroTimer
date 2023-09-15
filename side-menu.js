import { formatTime, timerEl, worker } from './script.js';

const toggleMenuButton = document.querySelector('.menu__customise');
const sideMenu = document.querySelector('.side-menu');
const CloseSideMenuButton = document.querySelector('.icon__close_container');
const customiseWorkInput = document.querySelector('#focus');
const customiseBreakInput = document.querySelector('#break');

toggleMenuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('side-menu_hidden');
});

CloseSideMenuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('side-menu_hidden');
});

customiseWorkInput.addEventListener('input', (event) => {
  const customiseWork = event.currentTarget.value * 60;
  timerEl.textContent = formatTime(customiseWork);
  worker.postMessage({ action: 'customiseWork', customiseWork });
});

customiseBreakInput.addEventListener('input', (event) => {
  const customiseBreak = event.currentTarget.value * 60;
  worker.postMessage({ action: 'customiseBreak', customiseBreak });
});
