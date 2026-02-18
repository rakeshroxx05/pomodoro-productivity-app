// LOGIN SYSTEM
function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "" || pass === "") {
    document.getElementById("loginMsg").innerText = "Enter username and password";
    return;
  }

  localStorage.setItem("pomodoroUser", user);
  localStorage.setItem("pomodoroPass", pass);
  document.getElementById("loginMsg").innerText = "Registered successfully! Now login.";
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const savedUser = localStorage.getItem("pomodoroUser");
  const savedPass = localStorage.getItem("pomodoroPass");

  if (user === savedUser && pass === savedPass) {
    localStorage.setItem("loggedIn", "true");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("appBox").style.display = "block";
  } else {
    document.getElementById("loginMsg").innerText = "Invalid login details";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.reload();
}

// CHECK LOGIN ON LOAD
window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("appBox").style.display = "block";
  }
};

// ---------------- POMODORO CODE ----------------

let workTime = 25 * 60;
let breakTime = 5 * 60;
let time = workTime;
let timer;
let isRunning = false;
let isWork = true;
let pomodoroCount = 0;

const timeDisplay = document.getElementById("time");
const modeDisplay = document.getElementById("mode");
const countDisplay = document.getElementById("count");
const alarm = document.getElementById("alarm");

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeDisplay.innerText =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(runTimer, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWork = true;
  time = workTime;
  modeDisplay.innerText = "Work Time";
  updateDisplay();
}

function runTimer() {
  if (time > 0) {
    time--;
    updateDisplay();
  } else {
    alarm.play();
    clearInterval(timer);
    isRunning = false;

    if (isWork) {
      pomodoroCount++;
      countDisplay.innerText = pomodoroCount;
      isWork = false;
      time = breakTime;
      modeDisplay.innerText = "Break Time";
    } else {
      isWork = true;
      time = workTime;
      modeDisplay.innerText = "Work Time";
    }
    updateDisplay();
  }
}

// TASKS
function addTask() {
  const input = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (input.value === "") return;

  const li = document.createElement("li");
  li.innerText = input.value;

  li.onclick = () => {
    li.classList.toggle("done");
  };

  taskList.appendChild(li);
  input.value = "";
}

// MOTIVATION API
function getQuote() {
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("quoteText").innerText =
        `"${data.content}" — ${data.author}`;
    })
    .catch(() => {
      document.getElementById("quoteText").innerText =
        "Stay focused and keep working!";
    });
}

getQuote();
updateDisplay();
