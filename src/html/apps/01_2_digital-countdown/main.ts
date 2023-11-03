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
const countDownErrorElem = document.querySelector(".countdown-error") as HTMLSpanElement;
const countDownFinishElem = document.querySelector(".countdown-finish") as HTMLSpanElement;


//Global Variables

let countDown:number;

//Functions

const formatCountTime: Function = (value:number):string => value < 10 ? "0" + value : `${value}`;


const createCountdown = () => {
    const actualCountDownTime: number = new Date().getTime()
    const dateCountDown: number = new Date(inputDateElem.value).getTime()
    if (inputTitleElem.value === "") {
        countDownErrorElem.innerText = "Please insert a countdown title!";
        setTimeout(() => {
            countDownErrorElem.innerText = "";
        },2000)
    }
    else if (!inputDateElem.value === true || (actualCountDownTime - dateCountDown) > 0 ) {
        countDownErrorElem.innerText = "Please select a future date!";
        setTimeout(() => {
            countDownErrorElem.innerText = "";
        },2000)
    }
    else {
        saveCountDown(inputTitleElem.value, dateCountDown)
    }
   
}

const renderCountDown = (value:{name:string, time:number}) => {
    btnCreateElem.style.display = "none";
    btnResetElem.style.display = "block";
    dataContainerElem.style.display = "none";
    countdownContainerElem.style.display = "flex";
    displayTitleElem.innerText = value.name;

    countDown = setInterval(() => {
        updateTimeCountDown(value)
    }, 1000)
    return countDown
}



const resetCountdown = ():void => {
    btnResetElem.style.display = "none";
    btnCreateElem.style.display = "block";
    countdownContainerElem.style.display = "none";
    dataContainerElem.style.display = "flex";
    inputTitleElem.value = ""
    inputDateElem.value = ""
    localStorage.removeItem('countdown');
    clearInterval(countDown)
    countDownFinishElem.innerText = ""
}

const updateTimeCountDown = (value:{name:string, time:number}) => {
    const actualCountDownTime: number = new Date().getTime()
    let gap: number = value.time - actualCountDownTime;

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
    if (gap < 1001 ) {
        clearInterval(countDown);
        countDownFinishElem.innerText = "Countdown finished!";
        dateCountsElem.innerText = "00"
        hoursCountElem.innerText = "00"
        minutesCountElem.innerText = "00"
        secondsCountsElem.innerText = "00"
    }
}

const getCountDown = () => {
     // is there a countdown in local storage?
    let savedCountDown:{name:string, time:number};
    if(localStorage.getItem('countdown') === null) {
        savedCountDown = {name: "", time:0};
    }
    else {
        savedCountDown = JSON.parse(localStorage.getItem("countdown") || "{}");
        renderCountDown(savedCountDown)
    }
    
}

getCountDown()

const saveCountDown = (title: string, time: number) => {
    // is there a countdown in local storage?
    let savedCountDown:{name: string, time:number};
    if(localStorage.getItem('countdown') === null) {
        savedCountDown = {name: "", time: 0};
    }
    else {
        savedCountDown = JSON.parse(localStorage.getItem("countdown") || "{}");
    }
    let localCountDown: {
        name:string,
        time: number
    }
    localCountDown = {name: title, time: time}
    localStorage.setItem("countdown", JSON.stringify(localCountDown));
    getCountDown()
}


//Events

btnCreateElem.addEventListener('click', createCountdown)
btnResetElem.addEventListener('click', resetCountdown)