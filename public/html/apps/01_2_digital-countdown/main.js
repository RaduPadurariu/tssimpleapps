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
const countDownErrorElem = document.querySelector(".countdown-error");
const countDownFinishElem = document.querySelector(".countdown-finish");
//Global Variables
let countDown;
//Functions
const formatCountTime = (value) => value < 10 ? "0" + value : `${value}`;
const createCountdown = () => {
    const actualCountDownTime = new Date().getTime();
    const dateCountDown = new Date(inputDateElem.value).getTime();
    if (inputTitleElem.value === "") {
        countDownErrorElem.innerText = "Please insert a countdown title!";
        setTimeout(() => {
            countDownErrorElem.innerText = "";
        }, 2000);
    }
    else if (!inputDateElem.value === true || (actualCountDownTime - dateCountDown) > 0) {
        countDownErrorElem.innerText = "Please select a future date!";
        setTimeout(() => {
            countDownErrorElem.innerText = "";
        }, 2000);
    }
    else {
        saveCountDown(inputTitleElem.value, dateCountDown);
    }
};
const renderCountDown = (value) => {
    btnCreateElem.style.display = "none";
    btnResetElem.style.display = "block";
    dataContainerElem.style.display = "none";
    countdownContainerElem.style.display = "flex";
    displayTitleElem.innerText = value.name;
    countDown = setInterval(() => {
        updateTimeCountDown(value);
    }, 1000);
    return countDown;
};
const resetCountdown = () => {
    btnResetElem.style.display = "none";
    btnCreateElem.style.display = "block";
    countdownContainerElem.style.display = "none";
    dataContainerElem.style.display = "flex";
    inputTitleElem.value = "";
    inputDateElem.value = "";
    localStorage.removeItem('countdown');
    clearInterval(countDown);
    countDownFinishElem.innerText = "";
};
const updateTimeCountDown = (value) => {
    const actualCountDownTime = new Date().getTime();
    let gap = value.time - actualCountDownTime;
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
    if (gap < 1001) {
        clearInterval(countDown);
        countDownFinishElem.innerText = "Countdown finished!";
        dateCountsElem.innerText = "00";
        hoursCountElem.innerText = "00";
        minutesCountElem.innerText = "00";
        secondsCountsElem.innerText = "00";
    }
};
const getCountDown = () => {
    // is there a countdown in local storage?
    let savedCountDown;
    if (localStorage.getItem('countdown') === null) {
        savedCountDown = { name: "", time: 0 };
    }
    else {
        savedCountDown = JSON.parse(localStorage.getItem("countdown") || "{}");
        renderCountDown(savedCountDown);
    }
};
getCountDown();
const saveCountDown = (title, time) => {
    // is there a countdown in local storage?
    let savedCountDown;
    if (localStorage.getItem('countdown') === null) {
        savedCountDown = { name: "", time: 0 };
    }
    else {
        savedCountDown = JSON.parse(localStorage.getItem("countdown") || "{}");
    }
    let localCountDown;
    localCountDown = { name: title, time: time };
    localStorage.setItem("countdown", JSON.stringify(localCountDown));
    getCountDown();
};
//Events
btnCreateElem.addEventListener('click', createCountdown);
btnResetElem.addEventListener('click', resetCountdown);
