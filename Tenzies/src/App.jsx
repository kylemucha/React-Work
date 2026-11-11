import Die from "./components/Die";
import LeaderboardName from "./components/LeaderboardName";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [count, setCount] = useState(0);
  const [player, setPlayer] = useState("");
  const [leaders, setLeaders] = useState([]);
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
    setCount((prevCount) => prevCount + 1);
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
    setCount((prevCount) => 0);
  }

  function handleChange(event) {
    const { value } = event.currentTarget;
    setPlayer(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLeaders((prevLeaders) => [
      ...prevLeaders,
      { id: nanoid(), playerName: player, playerScore: count },
    ]);
    setPlayer("");
    newGame();
  }

  const leaderboardNames = leaders
    .toSorted((a, b) => a.playerScore - b.playerScore)
    .map((leader) => (
      <LeaderboardName
        key={leader.id}
        playerName={leader.playerName}
        playerScore={leader.playerScore}
      />
    ));

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
      <div className="game-with-leaders">
        {leaders.length !== 0 ? (
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ol>{leaderboardNames}</ol>
          </div>
        ) : undefined}
        <div className="form-and-game">
          {gameWon ? (
            <div className="player">
              <form onSubmit={handleSubmit}>
                <label>Enter Player Name:</label>
                <input
                  type="text"
                  placeholder="Player 1"
                  name="player"
                  value={player}
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : undefined}
          {gameWon ? <Confetti /> : undefined}
          <div aria-live="polite" className="sr-only">
            {gameWon && (
              <p>Congratulations! You won! Press "New Game" to start again.</p>
            )}
          </div>
          <div className="game">
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between roles.
            </p>
            <div className="die-grid">{diceElements}</div>
            <button
              ref={buttonRef}
              className="roll-button"
              onClick={() => (gameWon ? newGame() : rollDice())}
            >
              {gameWon ? "New Game" : "Roll"}
            </button>
            <div className="counter">Roll Count: {count}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
