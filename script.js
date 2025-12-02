const elements = {
  hourHand: document.querySelector('.hour'),
  minuteHand: document.querySelector('.minute'),
  secondHand: document.querySelector('.second'),
  timeEl: document.querySelector('.time'),
  dateEl: document.querySelector('.date'),
  greetingText: document.getElementById('greetingText'),
  quoteText: document.getElementById('quoteText')
};

const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

const scale = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

function getGreeting(hour) {
  if (hour >= 22 || hour < 5) return 'GOOD NIGHT';
  if (hour >= 5 && hour < 12) return 'GOOD MORNING';
  if (hour >= 12 && hour < 18) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

function setRandomQuote() {
  elements.quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

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

  // Auto dark theme
  document.documentElement.classList.toggle('dark', hours >= 18 || hours < 6);

  elements.secondHand.style.transition = seconds === 0
    ? 'none'
    : 'transform 0.2s ease-in-out';

  // Rotate hands
  elements.hourHand.style.transform = `translate(-50%, -100%) rotate(${scale(clockHrs, 0, 11, 0, 360)}deg)`;
  elements.minuteHand.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
  elements.secondHand.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;

  // Update text
  elements.timeEl.textContent = `${clockHrs}:${String(minutes).padStart(2, '0')} ${am_pm}`;
  elements.dateEl.innerHTML = `<span class="circle">${date}</span> ${days[day]}, ${months[month]}`;
  elements.greetingText.textContent = `${getGreeting(hours)}, it's currently:`;
}

function updateClock() {
  setTime();
  requestAnimationFrame(updateClock);
}

setRandomQuote();
updateClock();