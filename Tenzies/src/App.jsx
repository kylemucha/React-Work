import Die from "./components/Die";
import { useState } from "react";
import { nanoid } from "nanoid"

    /**
     * Challenge: Create a function `hold` that takes
     * `id` as a parameter. For now, just have the function
     * console.log(id).
     * 
     * Then, figure out how to pass that function down to each
     * instance of the Die component so when each one is clicked,
     * it logs its own unique ID property. (Hint: there's more
     * than one way to make that work, so just choose whichever
     * you want)
     * 
     */

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

  function hold(id) {
    console.log(id);
  }

  const diceElements = dice.map((obj) => (
    <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} holdFunc={() => hold(obj.id)}/>
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
