var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

var lettersInChosenWord = [];
var blanksLetters = [];

var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

function init() {
  win.textContent = localStorage.getItem('winner') || 0
  if(localStorage.getItem('winner')){
    winCounter = localStorage.getItem('winner')
  }
  lose.textContent = localStorage.getItem('loser') || 0
  if(localStorage.getItem('loser')){
    loseCounter = localStorage.getItem('loser')
  }
}

init()

function countdown(){
  timer = setInterval(function() {
    timerCount--
    console.log(`timerCount`, timerCount)
    timerElement.textContent = timerCount
    if(timerCount === 0) {
      clearInterval(timer)
      console.log(`you lose`)
      setLose()
    }
    if(isWin && timerCount > 0){
      clearInterval(timer)
      console.log(`you win`)
      setWin()
    }
  }, 1000)
}

function setWin(){
  winCounter++
  localStorage.setItem('winner', winCounter)
  win.textContent = winCounter
  startButton.disabled = false
}

function setLose(){
  wordBlank.textContent = lettersInChosenWord.join(" ")
  loseCounter++
  localStorage.setItem('loser', loseCounter)
  lose.textContent = loseCounter
  startButton.disabled = false
}

function renderBlanks() {
  chosenWord = words[Math.floor(Math.random() * words.length )]
  lettersInChosenWord = chosenWord.split("")
  numBlanks = lettersInChosenWord.length
  blanksLetters = []

  for(let i = 0; i < numBlanks; i++){
    blanksLetters.push('_')
  }

  wordBlank.textContent = blanksLetters.join(' ')
}

function startGame() {
  startButton.disabled = true
  timerCount = 10
  countdown()
  renderBlanks()
}

function checkLetters(letter){
  var letterInWord = false
  for (let i = 0; i < numBlanks; i++) {
    if(lettersInChosenWord[i] == letter ){
      letterInWord = true
    }
  }
  if(letterInWord) {
    for (let j = 0; j < numBlanks; j++) {
      if(lettersInChosenWord[j] === letter){
        blanksLetters[j] = letter
      }
    }
    wordBlank.textContent = blanksLetters.join(' ')
  }
}

function checkWin() {
  if (chosenWord === blanksLetters.join('')){
    isWin = true
  }
}

startButton.addEventListener("click", startGame)

document.addEventListener("keypress", function(event){
  if(timerCount === 0) {
    return
  }

  var key = event.key.toLowerCase()
  var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("")

  if(alphabet.includes(key)){
    var letterPressed = event.key
    checkLetters(letterPressed)
    checkWin()
  }
})