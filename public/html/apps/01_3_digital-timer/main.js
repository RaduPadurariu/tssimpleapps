"use strict";
// Selectors
let hoursHTML = document.getElementById("hours");
let minutesHTML = document.getElementById("minutes");
let secondsHTML = document.getElementById("seconds");
let saveContainer = document.getElementById('saveData');
let btnStart = document.getElementById('start');
let btnStop = document.getElementById('stop');
let btnReset = document.getElementById('reset');
let btnSave = document.getElementById('save');
// Global variables
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;
// Functions
const formatTimer = (value) => value < 10 ? "0" + value : `${value}`;
const timeLogic = () => {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }
};
const updateTimeHtml = (seconds, minutes, hours) => {
    secondsHTML.innerHTML = formatTimer(seconds);
    minutesHTML.innerHTML = formatTimer(minutes);
    hoursHTML.innerHTML = formatTimer(hours);
};
// Functions for buttons
// Start button
const startTimer = () => {
    timer = setInterval(function () {
        timeLogic();
        updateTimeHtml(seconds, minutes, hours);
    }, 1000);
    btnStart.disabled = true;
    return timer;
};
// Stop button
const stopTimer = () => {
    clearInterval(timer);
    btnStart.disabled = false;
};
// Reset button
const resetTimer = () => {
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
const saveTimer = () => {
    let addSave = document.createElement('div');
    addSave.innerText = `${formatTimer(hours)}:${formatTimer(minutes)}:${formatTimer(seconds)}`;
    saveContainer.appendChild(addSave);
};
// Events
btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);
btnSave.addEventListener('click', saveTimer);
console.log('test');
