"use strict";
const rollDice = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const current1El = document.querySelector(".current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const hold = document.querySelector(".btn--hold");

let scores, activePlayer, currentScore, totalScore;
let playing = true;
function init() {
  scores = 0;
  activePlayer = 1;
  currentScore = 0;
  totalScore = [0, 0];
  document.querySelector(".current--0").textContent = 0;
  document.querySelector(".current--1").textContent = 0;
  document.querySelector(".totalscore1").textContent = 0;
  document.querySelector(".totalscore0").textContent = 0;
}
init();

function sswitch() {
  totalScore[activePlayer] = scores + totalScore[activePlayer];
  document.querySelector(`.totalscore${activePlayer}`).textContent =
    totalScore[activePlayer];
  activePlayer = activePlayer === 0 ? 1 : 0;
  scores = 0;
  currentScore = 0;
  player0.classList.toggle("active-player");
  player1.classList.toggle("active-player");
}

function roll() {
  const randomNumber = Math.round(Math.random() * 6);
  if (randomNumber !== 0) {
    if (randomNumber !== 1) {
      dice.classList.remove("hidden");
      dice.src = `images/dice-${randomNumber}.png`;
      currentScore = scores + randomNumber;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
      scores = currentScore;
    } else {
      dice.src = `images/dice-${randomNumber}.png`;
      activePlayer = activePlayer === 0 ? 1 : 0;
      scores = 0;
      currentScore = 0;
      document.querySelector(`.current--${activePlayer}`).textContent = 0;
      player0.classList.toggle("active-player");
      player1.classList.toggle("active-player");
    }
  }
}

rollDice.addEventListener("click", () => {
  if (playing) {
    roll();
  }

  if (totalScore[activePlayer] >= 100) {
    const bgc = document.querySelector(`.player--${activePlayer}`);
    bgc.style.backgroundColor = "lightgreen";
    init();
  }
});

hold.addEventListener("click", () => {
  if (playing) {
    sswitch();
  }

  if (totalScore[activePlayer] >= 100) {
    const bgc = document.querySelector(`.player--${activePlayer}`);
    bgc.style.backgroundColor = "lightgreen";
    init();
    playing = false;
  }
});

btnNew.addEventListener("click", () => {
  init();
  location.reload();
});
