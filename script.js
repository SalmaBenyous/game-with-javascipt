// 'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const bntHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore0El = 0;
let currentScore1El = 0;
let diceNum = 0; // Declare diceNum globally

// Initialize scores to 0
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;

// Function to check scores and update background color
function updateScoresAndCheckWinner() {
  if (parseInt(score0El.textContent) >= 100) {
    player0.classList.add('player--winner'); // Highlight winner// Reset background color for player 1
    diceEl.classList.add('hidden');
    playing = false;
  } else if (parseInt(score1El.textContent) >= 100) {
    player1.classList.add('player--winner'); // Highlight winner
    diceEl.classList.add('hidden');
    playing = false;
  }
}

function init() {
  currentScore0El = 0;
  currentScore1El = 0;
  diceNum = 0; // Declare diceNum globally
  // Initialize scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0El.textContent=0;
  current1El.textContent=0;
}
// Function to handle score updates and player switch
function handleScoreUpdate() {
  if (player0.classList.contains('player--active')) {
    // Update player 0's total score
    let totalScore0 = parseInt(score0El.textContent) || 0;
    score0El.textContent = totalScore0 + currentScore0El;
    // Reset current score
    current0El.textContent = 0;
    currentScore0El = 0; // Reset current score variable

    // Switch players
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    // Update player 1's total score
    let totalScore1 = parseInt(score1El.textContent) || 0;
    score1El.textContent = totalScore1 + currentScore1El;
    // Reset current score
    current1El.textContent = 0;
    currentScore1El = 0; // Reset current score variable

    // Switch players
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }

  // Check for winner
  updateScoresAndCheckWinner();
}

// Rolling dice functionality
bntRoll.addEventListener('click', function () {
  // 1. Generate a random dice roll between 1 and 6
  if (playing) {
    diceNum = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNum);

    // 2. Display dice image
    diceEl.src = `dice-${diceNum}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check dice roll result
    if (diceNum !== 1) {
      // Add dice number to current score
      if (player0.classList.contains('player--active')) {
        currentScore0El += diceNum;
        current0El.textContent = currentScore0El;
      } else {
        currentScore1El += diceNum;
        current1El.textContent = currentScore1El;
      }
    } else {
      // Switch player on roll of 1
      if (player0.classList.contains('player--active')) {
        current0El.textContent = 0;
        currentScore0El = 0; // Reset current score for player 0
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
      } else {
        current1El.textContent = 0;
        currentScore1El = 0; // Reset current score for player 1
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
      }
    }
  }
});

// Hold dice functionality
bntHold.addEventListener('click', function () {
  // Update scores and check for a winner
  handleScoreUpdate();
});
bntNew.addEventListener('click', function () {
  init();
  playing=true;
});
