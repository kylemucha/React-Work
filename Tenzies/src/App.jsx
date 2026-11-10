import Die from "./components/Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld === true) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return numbers;
  }
  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld === false
          ? { ...die, value: Math.floor(Math.random() * 6) + 1 }
          : die;
      }),
    );
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }

  function newGame() {
    setDice(() => generateAllNewDice());
  }

  const diceElements = dice.map((obj) => (
    <Die
      key={obj.id}
      value={obj.value}
      isHeld={obj.isHeld}
      hold={() => hold(obj.id)}
    />
  ));

  return (
    <main>
      {gameWon ? <Confetti /> : undefined}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <div className="game">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between roles.
        </p>
        <div className="die-grid">{diceElements}</div>
        <button
          ref={buttonRef}
          className="roll-button"
          onClick={() => (gameWon ? newGame() : rollDice())}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
