// Selectors
let hoursHTML = document.getElementById("hours") as HTMLSpanElement;
let minutesHTML = document.getElementById("minutes") as HTMLSpanElement;
let secondsHTML = document.getElementById("seconds") as HTMLSpanElement;
let saveContainer = document.getElementById('saveData') as HTMLDivElement;

let btnStart = document.getElementById('start') as HTMLButtonElement;
let btnStop = document.getElementById('stop') as HTMLButtonElement;
let btnReset = document.getElementById('reset') as HTMLButtonElement;
let btnSave = document.getElementById('save') as HTMLButtonElement;

// Global variables
let seconds: number = 0;
let minutes: number = 0;
let hours: number = 0;
let timer: number;


// Functions

const formatTimer: Function = (value:number):string => value < 10 ? "0" + value : `${value}`;

const timeLogic: Function = () => {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
}

const updateTimeHtml: Function = (seconds: number, minutes: number, hours: number) => {
  secondsHTML.innerHTML = formatTimer(seconds);
  minutesHTML.innerHTML = formatTimer(minutes);
  hoursHTML.innerHTML = formatTimer(hours);
}

// Functions for buttons

// Start button
const startTimer = (): number =>  {
  timer = setInterval(function () {
    timeLogic(); 
    updateTimeHtml(seconds, minutes, hours);
  }, 1000);

  btnStart.disabled = true;
  return timer;
};
 
// Stop button
const stopTimer = (): void => {
  clearInterval(timer);
  btnStart.disabled = false;
};



// Reset button
const resetTimer = (): void => {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateTimeHtml(seconds, minutes, hours);
  btnStart.disabled = false;

  while (saveContainer.firstChild) {
    saveContainer.removeChild(saveContainer.firstChild);
  }
};

// Save button
const saveTimer = (): void => {
 
  let addSave = document.createElement('div');
  addSave.innerText = `${formatTimer(hours)}:${formatTimer(minutes)}:${formatTimer(seconds)}`;
  saveContainer.appendChild(addSave);
};


// Events
btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);
btnSave.addEventListener('click', saveTimer);


console.log('test')