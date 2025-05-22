 // Auth Data
const correctPIN = "06082007"; // ddmmyyyy
const correctPassword = "manish";
const correctOTP = "2007";

let step = 0; // 0: PIN, 1: Password, 2: OTP
let lockedUntil = null;

const messageEl = document.getElementById("message");
const inputEl = document.getElementById("input-field");
const timerEl = document.getElementById("timer");

function handleSubmit() {
  const val = inputEl.value.trim().toLowerCase();
  if (lockedUntil && new Date() < lockedUntil) return;

  switch (step) {
    case 0:
      if (val === correctPIN) {
        step = 1;
        messageEl.textContent = "Enter your Name as Password:";
        inputEl.value = "";
      } else {
        alert("Incorrect PIN");
      }
      break;
    case 1:
      if (val === correctPassword.toLowerCase()) {
        alert("✅ Phone Unlocked Successfully!");
        reset();
      } else {
        step = 2;
        messageEl.textContent = "Incorrect password. Enter OTP (Year of Birth):";
        inputEl.value = "";
      }
      break;
    case 2:
      if (val === correctOTP) {
        alert("✅ Unlocked with OTP!");
        reset();
      } else {
        lockPhone();
      }
      break;
  }
}

function reset() {
  step = 0;
  inputEl.value = "";
  messageEl.textContent = "Enter your Date of Birth (ddmmyyyy):";
  timerEl.classList.add("hidden");
}

function lockPhone() {
  const now = new Date();
  lockedUntil = new Date(now.getTime() + 72 * 60 * 60 * 1000);
  messageEl.textContent = "🔐 Phone Locked for 72 Hours!";
  inputEl.style.display = "none";
  timerEl.classList.remove("hidden");
  updateTimer();
}

function updateTimer() {
  const interval = setInterval(() => {
    const now = new Date();
    const diff = lockedUntil - now;

    if (diff <= 0) {
      clearInterval(interval);
      timerEl.textContent = "🔓 You can try again now.";
      inputEl.style.display = "block";
      reset();
      lockedUntil = null;
    } else {
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      timerEl.textContent = `Try again in ${hrs}h ${mins}m ${secs}s`;
    }
  }, 1000);
}