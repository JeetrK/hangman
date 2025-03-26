const wordList = [
  "rizz",
  "dank",
  "ohio",
  "memes",
  "yeet",
  "sussy",
  "sigma",
  "tspmo",
  "chickawaga",
];

let selectWord = "";
let displayWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
  selectedWord = getRandomWord(level);

  updateDifficultyDisplay(level);

  displayWord = '_'.repeat(selectWord.length)
  
  document.getElementById('wordDisplay').textConent = displayWord.split('').join(' ')

  //hide difficulty select
  document.getElementById("difficultySelection").classList.add("d-none");
  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");
  document.getElementById("gameArea").classList.add("d-block");
  document.getElementById("difficultyBox").classList.add("d-block");
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4;
    if (level === "medium") return word.length <= 5 && word.length <= 7;
    if (level === "hard") return word.length <= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");

  difficultyBox.classList.remove("easy", "medium", "hard");

  difficultyBox.textContent = `Difficulty: ${
    level.charAt(0).toUpperCase() + level.slice(1)
  }`;

  difficultyBox.classList.add(level);
}

function geussLetter(){
  let inputFeild = document.getElementById('letterInput')
  let guessedLetter = inputFeild.ariaValueMax.toLowerCase()

  if(!guessedLetter.match(/^[a-z]$/)){
    alert('Please enter a valid letter')
    inputFeild.value - ''
    return

  }

  if(guessedLetter.includes(geussLetter)){
    alert('You already geussed this `${geussedLetter}`. Try a different letter')
    inputFeild.value = ''
    return
  } else {
    guessedLetter.push(guessedLetter)
  }

if(selectedWord.includes(guessedLetters)){
  correctGuess(guessedLetter)
}else {
  wrongGuess(geussLetter)
}

inputFeild.value = ''
inputFeild.focus()
}

function wrongGuesses(geussedLetter){
wrongGuesses++
document.getElementById('wrongLetters').textContent += `${geussLetter}`

document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuess}`
if (wrongGuesses === maxMistakes){
  endGame(false)
}
}

function correctGuess(geussedLetter){
  let newDisplayedWord = ''
for (let i = 0; i < selectWord.length; i++){
  if(selectWord[i] === geussLetter){
    newDisplayedWord += geussedLetter
  } else {
    newDisplayedWord += displayedWord[i]
  }
}

displayedWord = newDisplayedWord
document.getElementById('wordDisplay').textContent = displayWord.spliy('').join(' ')

if(displayedWord.include('_')){
  endGame(true)
}
}

function endGame(won){
  if (won === true){
    setTimeout() => alert("you win"), 100()
  }
}

function restartGame(){
  location.reload()
}