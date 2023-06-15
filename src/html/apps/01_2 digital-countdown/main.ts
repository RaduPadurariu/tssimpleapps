// Selectors

const inputTitleElem = document.getElementById('countdown-title') as HTMLInputElement;
const inputDateElem = document.getElementById('countdown-date') as HTMLInputElement;
const btnCreateElem = document.getElementById('btn-create') as HTMLInputElement;
const btnResetElem = document.getElementById('btn-reset') as HTMLInputElement;
const dataContainerElem = document.querySelector('.data-container') as HTMLDivElement;
const countdownContainerElem = document.querySelector('.countdownDisplay-container') as HTMLDivElement;
const displayTitleElem = document.querySelector('.display-title') as HTMLSpanElement;
const hoursCountElem = document.getElementById("hours") as HTMLSpanElement;
const minutesCountElem = document.getElementById("minutes")  as HTMLSpanElement;
const secondsCountsElem = document.getElementById("seconds")  as HTMLSpanElement;
const dateCountsElem = document.getElementById('days')  as HTMLSpanElement

//Global Variables



//Functions

const formatCountTime: Function = (value:number):string => value < 10 ? "0" + value : `${value}`;


const createCountdown = ():void => {
    btnCreateElem.style.display = "none";
    btnResetElem.style.display = "block";
    dataContainerElem.style.display = "none";
    countdownContainerElem.style.display = "flex";
    displayTitleElem.innerHTML = inputTitleElem.value;
    startCountDown()
}

const resetCountdown = ():void => {
    btnResetElem.style.display = "none";
    btnCreateElem.style.display = "block";
    countdownContainerElem.style.display = "none";
    dataContainerElem.style.display = "flex";
}

const updateTimeCountDown = ():void => {
    const dateCountDown: number = new Date(inputDateElem.value).getTime()
    const actualCountDownTime: number = new Date().getTime()
    const gap: number = dateCountDown - actualCountDownTime;

    const secondCountDown: number = 1000;
    const minuteCountDown: number = secondCountDown * 60;
    const hourCountDown: number = minuteCountDown * 60;
    const dayCountDown: number = hourCountDown * 24;

    const textDay: number = Math.floor(gap / dayCountDown);
    const textHour: number = Math.floor((gap % dayCountDown) / hourCountDown)
    const textMinute: number = Math.floor((gap % hourCountDown) / minuteCountDown)
    const textSecond: number = Math.floor((gap % minuteCountDown) / secondCountDown)

    dateCountsElem.innerText = formatCountTime(textDay)
    hoursCountElem.innerText = formatCountTime(textHour)
    minutesCountElem.innerText = formatCountTime(textMinute)
    secondsCountsElem.innerText = formatCountTime(textSecond)
}

let startCountDown = ():number => {
    let countDown: number = setInterval(updateTimeCountDown, 1000)
    return countDown
}

//Events

btnCreateElem.addEventListener('click', createCountdown)
btnResetElem.addEventListener('click', resetCountdown)