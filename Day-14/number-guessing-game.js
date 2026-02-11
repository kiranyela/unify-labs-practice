// Interactive Number Guessing Game
// Beginner-Intermediate
// Run with Node.js

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const randomNumber = Math.floor(Math.random() * 100) + 1;
const maxAttempts = 10;
let attempts = 0;

console.log("Welcome to the Interactive Number Guessing Game!");
console.log("Guess a number between 1 and 100.");

function askGuess() {
  rl.question(
    `Attempt ${attempts + 1}/${maxAttempts}: Enter your guess: `,
    (input) => {
      const guess = Number(input);
      attempts++;

      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log("Please enter a valid number between 1 and 100.");
        attempts--;
        askGuess();
        return;
      }

      if (guess === randomNumber) {
        console.log(
          `🎉 Correct! The number was ${randomNumber}. You guessed it in ${attempts} attempts.`
        );
        rl.close();
      } else if (attempts >= maxAttempts) {
        console.log(`Game Over! The correct number was ${randomNumber}.`);
        rl.close();
      } else if (guess < randomNumber) {
        console.log("Too Low!");
        askGuess();
      } else {
        console.log("Too High!");
        askGuess();
      }
    }
  );
}

askGuess();
