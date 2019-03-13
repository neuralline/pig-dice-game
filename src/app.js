/* 
Neural Line
Gambler js
@author Darik Hart
@git https://github.com/neuralline


Late night challenge 2019  */
//@ts-check
import { createCardContainer, createDiv } from "./components/dice-templates";
import doubleDice from "./components/double-dice";
import { bankRolling, handleRolling } from "./components/pig-dice-functions";
import singleDice from "./components/single-dice";
const submit = document.getElementById("submit");
const selectPlayers = document.getElementById("selectPlayers");
const gameType = document.getElementById("gameType");
const rollButton = document.getElementById("rollButton");
const rollsButtonInfo = document.getElementById("rollsButtonInfo");
const passButtonInfo = document.getElementById("passButtonInfo");
const passButton = document.getElementById("passButton");
const cardHolder = document.getElementById("cardHolder");
const introScreen = document.getElementById("introScreen");
const rollerContainer = document.getElementById("rollerContainer");

class TheGame {
  constructor(id) {
    this.numberOfPlayers = 5;
    this.turn = 0;
    this.singleOrDoubleGame = 0;
    this.player = [];
    this.maxScore = 100;
    this.initialState = {
      id: 0,
      score: 0,
      tempScore: 0,
      chain: 0,
      streak: 0,
      resets: 0,
      missHand: 0,
      passes: 0,
      hands: [0, 0],
      accumulated: [],
      info: "Ready"
    };
    this.elements = [];
  }
  /**
   *
   * @param {number} number
   * @param {boolean} singleOrDoubleGame
   */
  preparePlayers(number = 2, singleOrDoubleGame = true) {
    this.numberOfPlayers = number;
    this.turn = 0;

    if (singleOrDoubleGame) {
      this.maxScore = 100;
      this.dice = singleDice;
    } else {
      this.maxScore = 1000;
      this.dice = doubleDice;
    }

    cardHolder.innerHTML = "";
    cardHolder.style.display = "grid";
    rollerContainer.style.display = "block";
    introScreen.style.display = "none";

    for (let id = 0; id < this.numberOfPlayers; id++) {
      this.player.push({
        ...this.initialState,
        id,
        name: "Player " + (id + 1),
        singleOrDoubleGame
      });

      this.elements[id] = createCardContainer(this.player[id]);
      this.elements[id].appendChild(createDiv(this.player[id]));
      cardHolder.appendChild(this.elements[id]);
    }
  }

  //{ ok: false, data: 0, hand1: 1, hand2: null, reset: false }
  roll() {
    if (this.endGame) return;
    const pigDice = this.dice();
    const stats = handleRolling(this.player[this.turn], pigDice);
    this.player[this.turn] = stats;
    this.elements[this.turn].innerHTML = "";
    this.elements[this.turn].appendChild(createDiv(stats));
    rollsButtonInfo.innerText = stats.tempScore;
    passButtonInfo.innerText = stats.score;
    if (stats.tempScore === 0) {
      return this.nextPlayer();
    }
  }
  pass() {
    const stats = bankRolling(this.player[this.turn]);
    rollsButtonInfo.innerText = stats.tempScore;
    passButtonInfo.innerText = stats.score;
    this.elements[this.turn].innerHTML = "";
    this.elements[this.turn].appendChild(createDiv(stats));
    stats.score > this.maxScore ? this.winner() : this.nextPlayer();
  }

  winner() {
    this.endGame = true;
    const stats = bankRolling(this.player[this.turn]);
    rollsButtonInfo.innerText = stats.tempScore;
    passButtonInfo.innerText = stats.score;
    this.elements[this.turn].innerHTML = "";
    this.elements[this.turn].appendChild(
      createDiv({ ...stats, info: "WINNER" })
    );
  }

  nextPlayer() {
    this.turn = this.turn >= this.numberOfPlayers - 1 ? 0 : this.turn + 1;
    this.elements[this.turn].innerHTML = "";
    this.elements[this.turn].appendChild(
      createDiv({ ...this.player[this.turn], info: "Rolling" })
    );
  }
}

/**
 *
 * init The Game
 */

cardHolder.style.display = "none";
rollerContainer.style.display = "none";
introScreen.style.display = "grid";

const readyPiggyDice = new TheGame("Pig of Dice");

rollButton.addEventListener("click", e => {
  e.preventDefault();
  readyPiggyDice.roll();
});

passButton.addEventListener("click", e => {
  e.preventDefault();
  readyPiggyDice.pass();
});

submit.addEventListener("click", e => {
  e.preventDefault();
  readyPiggyDice.preparePlayers(selectPlayers.value, gameType.checked);
});
