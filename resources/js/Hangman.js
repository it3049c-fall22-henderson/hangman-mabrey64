import { isNullOrUndefined } from "util";

class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a patameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  start(difficulty, next) {
    // get word and set it to the class's this.word
    // clear canvas
    // draw base
    // reset this.guesses to empty array
    // reset this.isOver to false
    // reset this.didWin to false
    const answer = this.getRandomWord(difficulty);
    this.word = answer;
    next();
    canvas.clearCanvas();
    canvas.drawBase();
    this.guesses = [];
    this.isOver = false;
    this.didWin = false;
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    // Check if nothing was provided and throw an error if so
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    // Check if more than one letter was provided. throw an error if it is.
    // if it's a letter, convert it to lower case for consistency.
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.
    // add the new letter to the guesses array.
    // check if the word includes the guessed letter:
    //    if it's is call checkWin()
    //    if it's not call onWrongGuess()
    var symbols = /^[0-9a-zA-Z]+$/;
    try {
      if(letter == ``) throw `Please enter in a letter.`;
      if(letter.match(symbols)) throw `Symbols or numbers are not in a word, or this word for that matter. Please enter a letter.`;
      if(letter.length >> 0) throw `Only 1 letter entered at a time.`;
    } catch {
      return false;
    }
    letter.toLowerCase();
    if (this.guesses.includes(letter)){
      throw `You've used this letter already. Enter a letter that hasn't been used.`;
    }
    else {
      this.guesses.push(letter);
    }
    if(this.word.includes(letter))
    {
      checkWin();
    }
    else {
      onWrongGuess();
    }
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true
    const lettersRemaining = this.word.match(this.guesses);
    if (lettersRemaining == `0`)
    {
      this.didWin() = true;
      this.isOver() = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    if (this.guesses.length = 1)
    {
      drawHead();
    }
    else if (this.guesses.length = 2)
    {
      drawHead();
      drawBody();
    }
    else if (this.guesses.length = 3)
    {
      drawHead();
      drawBody();
      drawLeftArm();
    }
    else if (this.guesses.length = 4)
    {
      drawHead();
      drawBody();
      drawLeftArm();
      drawRightArm();
    }
    else if (this.guesses.length = 5)
    {
      drawHead();
      drawBody();
      drawLeftArm();
      drawRightArm();
      drawLeftLeg();
    }
    else (this.guesses.length = 6)
    {
      drawHead();
      drawBody();
      drawLeftArm();
      drawRightArm();
      drawLeftLeg();
      drawRightLeg();
      this.isOver() = true;
      this.didWin() = false;
    }
  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    const word = this.answer;
    word.replace(/[a-z]/g, `_`).split(``).join(` `);
    return word;
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    this.guesses.join(`, `);
    return `Guesses: ${this.guesses}`;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {
    this.ctx.beginPath();
    this.ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(95, 75);
    this.ctx.lineTo(95, 145);
    this.ctx.stroke();
  }

  drawLeftArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(95, 85);
    this.ctx.lineTo(125, 110);
    this.ctx.stroke();
  }

  drawRightArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(95, 85);
    this.ctx.lineTo(65, 110);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(95, 115);
    this.ctx.lineTo(125, 170);
    this.ctx.stroke();
  }

  drawRightLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(95, 115);
    this.ctx.lineTo(65, 170);
    this.ctx.stroke();
  }
}
