
/**
 * Stuff to fix tomorrow for future self:
 * 1. Show letters in guesses.
 * 2. Same thing as 1 but fill in the underscores with the letters as they are guessed.
 * 3. Move the person to match the base of the gallows.
 * 4. Fix index.html so that the startWrapper and gameWrapper are visible and/or hidden when needed.
 * 5. Fix index.js code so that it immediately DOESN'T have the user lose the game after guessing 1 letter.
 * 6. Fix Hangman.js code so that only letters are allowed to be enter and not return a false immediately.
 * 7. Figure out how to set a const to a method (the opposite of calling a function and setting it to the const).
 * After steps 1-7 are done, make sure the whole thing still works properly according to instructions,
 * Then I can add in canvas and css to make the program look good.
 * From
 * -Past Devon
 * P.S. Don't immediately use someone's (I.E. the TA's) code unless you know what it does. Use it as an example of what you CAN do, no copy paste. Figure out a way to make your own code work first, or find a way through da internet.
 * And don't give up. You are better than this and have people that know you can do better and see this through.
 */


// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById('startWrapper');
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);
const guessSubmitButton = document.getElementById(`guessSubmitButton`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);


// The following Try-Catch Block will catch the errors thrown
try {
  let game = new Hangman(canvas);
  // Instantiate a game Object using the Hangman class.
  // add a submit Event Listener for the to the difficultySelectionForm
  //    get the difficulty input
  //    call the game start() method, the callback function should do the following
  //       1. hide the startWrapper
  //       2. show the gameWrapper
  //       3. call the game getWordHolderText and set it to the wordHolderText
  //       4. call the game getGuessessText and set it to the guessesText
  difficultySelectForm.addEventListener(`submit`, function (event) {
    const selectedDifficulty = difficultySelect.options[difficultySelect.selectedIndex].value;
    game.start(selectedDifficulty, function next(wordAnswer){
      wordAnswer = game.word;
      startWrapper.classList.add('hidden');
      gameWrapper.classList.remove('hidden');
      wordHolderText.innerHTML = game.getWordHolderText();
      guessesText.innerHTML = game.getGuessesText();
    });
    event.preventDefault();
  });

  // add a submit Event Listener to the guessForm
  //    get the guess input
  //    call the game guess() method
  //    set the wordHolderText to the game.getHolderText
  //    set the guessesText to the game.getGuessesText
  //    clear the guess input field
  // Given the Guess Function calls either the checkWin or the onWrongGuess methods
  // the value of the isOver and didWin would change after calling the guess() function.
  // Check if the game isOver:
  //      1. disable the guessInput
  //      2. disable the guessButton
  //      3. show the resetGame button
  // if the game is won or lost, show an alert.
  guessForm.addEventListener(`submit`, function (e) {
    const input = guessInput.value;
    game.guess(input);
    wordHolderText.innerHTML = game.getWordHolderText();
    guessesText.innerHTML = game.getGuessesText();
    guessInput.value = "";  
      checkWinOrLose();
    event.preventDefault();
  });

function checkWinOrLose(){
    if (game.isOver === true){
      if (game.didWin === true){
        guessInput.disabled = true;
        guessSubmitButton.disabled = true;
        resetGame.classList.remove('hidden');
        alert(`You have won the game!`)
      }
      else {
        guessInput.disabled = true;
        guessSubmitButton.disabled = true;
        resetGame.classList.remove('hidden');
        alert(`Better luck next time...`)
      };
    }
  }

  // add a click Event Listener to the resetGame button
  //    show the startWrapper
  //    hide the gameWrapper
  resetGame.addEventListener(`click`, function (e) {
    startWrapper.classList.remove('hidden');
    gameWrapper.classList.add('hidden');
    guessInput.disabled = false;
    guessSubmitButton.disabled = false;
    resetGame.classList.add('hidden');
  });

} catch (error) {
  console.error(error);
  alert(error);
}
