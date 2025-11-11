const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const greetingText = document.getElementById("greetingText");
const quoteText = document.getElementById("quoteText");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const quotes = [
  `"Code is like humor. When you have to explain it, it's bad." - Cory House`,
  `"First, solve the problem. Then, write the code." - John Johnson`,
  `"Experience is the name everyone gives to their mistakes." - Oscar Wilde`,
  `"In order to be irreplaceable, one must always be different." - Coco Chanel`,
  `"Simplicity is the soul of efficiency." - Austin Freeman`,
  `"Fix the cause, not the symptom." - Steve Maguire`,
  `"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler`,
  `"Before software can be reusable it first has to be usable." - Ralph Johnson`,
  `"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code." - Dan Salomon`,
  `"Good code is its own best documentation." - Steve McConnell`
];

function setTime() {
  const time = new Date();
  const day = time.getDay();
  const date = time.getDate();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const month = time.getMonth();
  const hours = time.getHours();
  const clockHrs = hours % 12 || 12;
  const am_pm = hours >= 12 ? 'PM' : 'AM';

  const autoTheme = hours >= 18 || hours < 6;
  document.documentElement.classList.toggle('dark', autoTheme);

  hourHand.style.transform = `translate(-50%, -100%) rotate(${scale(clockHrs, 0, 11, 0, 360)}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;

  timeEl.innerHTML = `${clockHrs}:${minutes < 10 ? `0${minutes}` : minutes} ${am_pm}`;
  dateEl.innerHTML = `<span class="circle">${date}</span> ${days[day]}, ${months[month]}`;
  greetingText.textContent = `${getGreeting(hours)}, it's currently:`;
}

function getGreeting(hour) {
  if (hour >= 22 || hour < 5) return 'GOOD NIGHT';
  if (hour >= 5 && hour < 12) return 'GOOD MORNING';
  if (hour >= 12 && hour < 18) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteText.textContent = randomQuote;

setInterval(setTime, 1000);

setTime();


