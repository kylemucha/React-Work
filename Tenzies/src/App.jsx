import Die from "./components/Die";
import { useState, useEffect} from "react"

    /**
     * Challenge: Create a `Roll Dice` button that will re-roll
     * all 10 dice
     * 
     * Clicking the button should generate a new array of numbers
     * and set the `dice` state to that new array (thus re-rendering
     * the array to the page)
     */

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice)

  function generateAllNewDice() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(Math.floor(Math.random() * 6) + 1);
    }
    return numbers;
  }

  function handleClick() {
    setDice(generateAllNewDice)
  }

  const diceElements = dice.map((num) => <Die value={num}/>)

  return (
    <main>
      <div className="game">
        <div className="die-grid">
          {diceElements}
        </div>
        <button className="roll-button" onClick={handleClick}>Roll</button>
      </div>
    </main>
  );
}
