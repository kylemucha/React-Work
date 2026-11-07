import Die from "./components/Die";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice);

  function generateAllNewDice() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    console.log(numbers);
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
      <div className="game">
        <h1>Tenzies</h1>
        <p>
          You Roll until all dice are the same. Click each die to freeze it at its
          current value between roles.
        </p>
        <div className="die-grid">{diceElements}</div>
        <button className="roll-button" onClick={rollDice}>
          Roll
        </button>
      </div>
    </main>
  );
}
