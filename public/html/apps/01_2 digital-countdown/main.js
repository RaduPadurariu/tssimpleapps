"use strict";
// Selectors
const inputTitleElem = document.getElementById('countdown-title');
const inputDateElem = document.getElementById('countdown-date');
const btnCreateElem = document.getElementById('btn-create');
const btnResetElem = document.getElementById('btn-reset');
const dataContainerElem = document.querySelector('.data-container');
const countdownContainerElem = document.querySelector('.countdownDisplay-container');
const displayTitleElem = document.querySelector('.display-title');
const hoursCountElem = document.getElementById("hours");
const minutesCountElem = document.getElementById("minutes");
const secondsCountsElem = document.getElementById("seconds");
const dateCountsElem = document.getElementById('days');
//Global Variables
//Functions
const formatCountTime = (value) => value < 10 ? "0" + value : `${value}`;
const createCountdown = () => {
    btnCreateElem.style.display = "none";
    btnResetElem.style.display = "block";
    dataContainerElem.style.display = "none";
    countdownContainerElem.style.display = "flex";
    displayTitleElem.innerHTML = inputTitleElem.value;
    startCountDown();
};
const resetCountdown = () => {
    btnResetElem.style.display = "none";
    btnCreateElem.style.display = "block";
    countdownContainerElem.style.display = "none";
    dataContainerElem.style.display = "flex";
};
const updateTimeCountDown = () => {
    const dateCountDown = new Date(inputDateElem.value).getTime();
    const actualCountDownTime = new Date().getTime();
    const gap = dateCountDown - actualCountDownTime;
    const secondCountDown = 1000;
    const minuteCountDown = secondCountDown * 60;
    const hourCountDown = minuteCountDown * 60;
    const dayCountDown = hourCountDown * 24;
    const textDay = Math.floor(gap / dayCountDown);
    const textHour = Math.floor((gap % dayCountDown) / hourCountDown);
    const textMinute = Math.floor((gap % hourCountDown) / minuteCountDown);
    const textSecond = Math.floor((gap % minuteCountDown) / secondCountDown);
    dateCountsElem.innerText = formatCountTime(textDay);
    hoursCountElem.innerText = formatCountTime(textHour);
    minutesCountElem.innerText = formatCountTime(textMinute);
    secondsCountsElem.innerText = formatCountTime(textSecond);
};
let startCountDown = () => {
    let countDown = setInterval(updateTimeCountDown, 1000);
    return countDown;
};
//Events
btnCreateElem.addEventListener('click', createCountdown);
btnResetElem.addEventListener('click', resetCountdown);
