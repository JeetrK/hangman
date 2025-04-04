const wordList = [
  "dank",
  "rizz",
  "sussy",
  "migusta",
  "freshavacado",
  "pewdiepie",
  "tseries",
  "Diddy",
  "nettspend",
  "choppedchin",
  "baka",
  "skibidi",
];

// setting Game Variables
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
  selectedWord = getRandomWord(level);

  // Update Difficulty Display Div
  updateDifficultyDisplay(level);

  // Create the placeholder's for the selected word
  displayedWord = "_".repeat(selectedWord.length);
  // display the updated Word
  document.getElementById("wordDisplay").textContent = displayedWord.split("").join(" ");

  // Hide Difficulty Selection and Show Game Area & Difficulty Box
  document.getElementById("difficultySelection").classList.add("d-none");
  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4; // Easy: 4 or fewer letters
    if (level === "medium") return word.length >= 5 && word.length <= 7; // Medium: 5-7 letters
    if (level === "hard") return word.length >= 8; // Hard: 8+ letters
  });
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");

  // Remove any previous difficulty classes ('easy', 'medium', 'hard')
  difficultyBox.classList.remove("easy", "medium", "hard");

  // Set text & apply class dynamically using template literals
  difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
  difficultyBox.classList.add(level);
}

function guessLetter() {
  let inputField = document.getElementById("letterInput");
  let guessedLetter = inputField.value.toLowerCase();

  // Check if input is a valid letter (a-z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert("Please enter a valid letter (A-Z)!");
    inputField.value = ""; // Clear input field
    return;
  }

  // Check if letter was already guessed
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`);
    inputField.value = ""; // Clear input field
    return;
  } else {
    guessedLetters.push(guessedLetter);
  }

  // Check if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }

  inputField.value = ""; // Clear input field
  inputField.focus(); // Refocus input field for next guess
}

function wrongGuess(guessedLetter) {
  wrongGuesses++;
  document.getElementById("wrongLetters").textContent += ` ${guessedLetter}`;
  document.getElementById("trollface").src = `img/Trollface${6 - wrongGuesses}.jpg`;

  if (wrongGuesses === maxMistakes) {
    endGame(false);
  }
}

function correctGuess(guessedLetter) {
  let newDisplayedWord = "";

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter;
    } else {
      newDisplayedWord += displayedWord[i];
    }
  }

  displayedWord = newDisplayedWord;
  document.getElementById("wordDisplay").textContent = displayedWord.split("").join(" ");

  if (!displayedWord.includes("_")) {
    endGame(true);
  }
}

function endGame(won) {
  if (won) {
    setTimeout(() => alert("MOM GET THE CAMERA"), 100);
    document.getElementById("winsound").play();
  } else {
    setTimeout(() => alert("DAMN BOI GET REKTTTT"), 100);
    document.getElementById("losesound").play();
  }
}

function restartGame() {
  location.reload();
}

// Add the Enter key feature
document.getElementById("letterInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    guessLetter(); 
  }
});
