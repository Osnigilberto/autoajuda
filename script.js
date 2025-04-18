let isRunning = false;
let intervalId;
let seconds = 0;

let sino = new Audio("assets/sounds/bell-a.mp3");
let ambiente = null;
let isMuted = false;

const instructions = document.getElementById("instructions");
const circle = document.getElementById("circle");
const timerDisplay = document.getElementById("timer");
const soundSelect = document.getElementById("soundSelect");
const startBtn = document.getElementById("startBtn");
const muteBtn = document.getElementById("muteBtn");

function toggleBreathing() {
  if (!isRunning) {
    startBtn.innerText = "Parar";
    startMeditation();
  } else {
    stopMeditation();
    startBtn.innerText = "Iniciar";
  }
}

function startMeditation() {
  isRunning = true;
  seconds = 0;
  timerDisplay.innerText = "00:00";

  const selectedSound = soundSelect.value;
  if (selectedSound) {
    ambiente = new Audio(`assets/sounds/${selectedSound}`);
    ambiente.loop = true;
    if (!isMuted) ambiente.play();
  }

  instructions.innerText = "Antes de começar, certifique-se de que está numa posição confortável...";

  setTimeout(() => {
    let countdown = 5;
    const countdownInterval = setInterval(() => {
      instructions.innerText = `Começaremos em ${countdown}...`;
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        sino.play();
        setTimeout(() => {
          iniciarCiclo();
          iniciarCronometro();
        }, 1000);
      }
    }, 1000);
  }, 2000);
}

function stopMeditation() {
  isRunning = false;
  clearInterval(intervalId);
  instructions.innerText = "Meditação finalizada.";
  if (ambiente) ambiente.pause();
}

function iniciarCiclo() {
  if (!isRunning) return;

  instructions.innerText = "Inspire...";
  circle.style.transform = "scale(1.5)";
  
  setTimeout(() => {
    instructions.innerText = "Segure...";

    setTimeout(() => {
      instructions.innerText = "Expire...";
      circle.style.transform = "scale(1)";

      setTimeout(() => {
        instructions.innerText = "Segure...";

        setTimeout(() => {
          if (isRunning) iniciarCiclo();
        }, 1000);
      }, 4000);
    }, 4000);
  }, 4000);
}

function iniciarCronometro() {
  intervalId = setInterval(() => {
    seconds++;
    let min = Math.floor(seconds / 60).toString().padStart(2, '0');
    let sec = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.innerText = `${min}:${sec}`;
  }, 1000);
}

function toggleMute() {
  isMuted = !isMuted;
  if (ambiente) {
    ambiente.muted = isMuted;
  }
  sino.muted = isMuted;
  muteBtn.innerText = isMuted ? "🔇 Mudo" : "🔊 Som";
}

function toggleTheme() {
    document.body.classList.toggle("dark");
  }
  
  function compartilharWhatsApp() {
    const mensagem = encodeURIComponent("Acabei de meditar com o Respira.ai 🌱 Respire você também: https://respiraai.netlify.app/landing.html");
    const url = `https://wa.me/?text=${mensagem}`;
    window.open(url, "_blank");
  }
  