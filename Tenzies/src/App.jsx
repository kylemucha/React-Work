import Die from "./components/Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid"

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice);

  function generateAllNewDice() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({ value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid()});
    }
    console.log(numbers);
    return numbers;
  }

  function handleClick() {
    setDice(generateAllNewDice);
  }

  const diceElements = dice.map((obj) => (
    <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} />
  ));

  return (
    <main>
      <div className="game">
        <div className="die-grid">{diceElements}</div>
        <button className="roll-button" onClick={handleClick}>
          Roll
        </button>
      </div>
    </main>
  );
}
