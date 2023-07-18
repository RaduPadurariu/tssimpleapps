
// Selectors
let hoursElem = document.getElementById("hours") as HTMLSpanElement;
let minutesElem = document.getElementById("minutes")  as HTMLSpanElement;
let secondsElem = document.getElementById("seconds")  as HTMLSpanElement;
let dateElem = document.getElementById('date')  as HTMLSpanElement
let dayElem = document.getElementById('day')  as HTMLSpanElement
let monthElem = document.getElementById('month')  as HTMLSpanElement;
let yearElem = document.getElementById('year')  as HTMLSpanElement;

// Events


// Global variables

const monthArr: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Functions

const formatTime: Function = (value:number):string => value < 10 ? "0" + value : `${value}`;

const displayTime = () => {
  let dateTime: Date  = new Date()
  let hrs: number = dateTime.getHours()
  let min: number = dateTime.getMinutes()
  let sec: number = dateTime.getSeconds()
  let date: number = dateTime.getDate()
  let day: number = dateTime.getDay()
  let month: number = dateTime.getMonth()
  let year: number= dateTime.getFullYear()
  console.log('test')

  hoursElem.innerHTML = formatTime(hrs);
  minutesElem.innerHTML = formatTime(min);
  secondsElem.innerHTML = formatTime(sec);
  dateElem.innerHTML = formatTime(date)
  dayElem.innerHTML = days[day]
  monthElem.innerHTML = monthArr[month].toUpperCase();
  yearElem.innerHTML = `${year}`;

}

displayTime()
setInterval(displayTime, 1000)