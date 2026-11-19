import { useState } from "react";
import { avengers } from "../avengers";
import { clsx } from "clsx";
import Header from "./components/Header";
import AvengerTile from "./components/AvengerTile";

/** 
 * features to add
 * - farewell messages in status section
 * - fix a11y issues
 * - make new game button work
 * - choose a random word instead of a set word
 * - confetti drop on win
*/

export default function App() {
  // state variables
  const [currentWord, setCurrentWord] = useState("react");
  const [guessed, setGuessed] = useState([]);

  //derived variables
  const wrongGuessCount = guessed.filter((letter) => {
    return !currentWord.includes(letter);
  }).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessed.includes(letter));

  const isGameLost = wrongGuessCount >= avengers.length - 1;

  const isGameOver = isGameWon === true || isGameLost === true;

  console.log(
    "is won",
    isGameWon,
    "is lost",
    isGameLost,
    "is over",
    isGameOver,
  );

  //static variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function populateAllies() {
    return avengers.map((hero, index) => {
      return (
        <AvengerTile
          key={hero.name}
          name={hero.name}
          backgroundColor={hero.backgroundColor}
          color={hero.color}
          dead={index >= wrongGuessCount ? hero.dead : true}
        />
      );
    });
  }

  const populatedWord = [...currentWord].map((letter, index) => {
    return (
      <span key={index}>
        {guessed.includes(letter) && currentWord.includes(letter)
          ? letter.toUpperCase()
          : undefined}
      </span>
    );
  });

  const populateKeyboard = [...alphabet].map((letter) => {
    return (
      <button
        className={clsx({
          "keyboard-button-neutral": !guessed.includes(letter),
          "keyboard-button-correct":
            guessed.includes(letter) && currentWord.includes(letter),
          "keyboard-button-wrong":
            guessed.includes(letter) && !currentWord.includes(letter),
        })}
        key={letter}
        onClick={() => handleClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function handleClick(letter) {
    setGuessed((prevGuessed) =>
      prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter],
    );
  }

  function renderGameStatus() {
    if(!isGameOver) {
      return null
    } 
    if(isGameWon) {
      return (<div className="win-status">
          <p>You win!</p>
          <p>Well done!</p>
        </div>)
    } else if(isGameLost)  {
      return (<div className="lose-status">
          <p>You Lose!</p>
          <p>All hail DR. DOOM!</p>
        </div>)
    }
  }

  function handleNewGame() {}

  return (
    <main>
      <Header />
      {renderGameStatus()}
      <div className="allies">{populateAllies()}</div>
      <div className="word">{populatedWord}</div>
      <div className="keyboard">{populateKeyboard}</div>
      {isGameOver && (
        <button className="new-game" onClick={handleNewGame}>
          New Game
        </button>
      )}
    </main>
  );
}
