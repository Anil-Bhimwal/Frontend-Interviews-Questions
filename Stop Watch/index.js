let timer = document.getElementById("timer"); //timer element
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
let startTime = 0;
let milisElapsedBeforeLastStart = 0;
let timerId;
const INTERVAL_MS = 1000 / 60;
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();
  timerId = setInterval(updateTimer, INTERVAL_MS);
}
function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  milisElapsedBeforeLastStart += Date.now() - startTime;
  clearInterval(timerId);
}
function resetTimer() {
  resetButton.disabled = true;
  timer.innerText = "00:00:00";
  milisElapsedBeforeLastStart = 0;
}

function updateTimer() {
  const timeElapsed = Date.now() - startTime + milisElapsedBeforeLastStart;
  const secondElapsed = timeElapsed / 1000;
  const minutesElapsed = secondElapsed / 60;
  const milisText = formatNumber(timeElapsed % 1000, 3);
  const secondsText = formatNumber(Math.floor(secondElapsed) % 60, 2);
  const minutesText = formatNumber(Math.floor(minutesElapsed), 2);

  timer.innerText = `${minutesText}:${secondsText}:${milisText}`;
}

function formatNumber(number, desiredLength) {
  const stringNumber = String(number);
  return stringNumber.padStart(desiredLength, "0");
}
