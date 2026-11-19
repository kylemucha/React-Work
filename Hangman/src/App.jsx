import { useState } from "react";
import { avengers } from "../avengers";
import { getFarewellText } from "../utils";
import { clsx } from "clsx";
import Header from "./components/Header";
import AvengerTile from "./components/AvengerTile";

/**
 * features to add
 * - fix a11y issues
 * - choose a random word instead of a set word
 * - confetti drop on win
 */

export default function App() {
  // state variables
  const [currentWord, setCurrentWord] = useState("react");
  const [guessed, setGuessed] = useState([]);
  const [farewellText, setFarewellText] = useState("");

  //derived variables
  const wrongGuessCount = guessed.filter((letter) => {
    return !currentWord.includes(letter);
  }).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessed.includes(letter));

  const isGameLost = wrongGuessCount >= avengers.length - 1;

  const isGameOver = isGameWon || isGameLost;

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
          dead={index < wrongGuessCount}
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
        disabled={isGameOver}
        onClick={() => handleClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function handleClick(letter) {
    if (guessed.includes(letter)) {
      return;
    } else if (!currentWord.includes(letter)) {
      setFarewellText(getFarewellText(avengers[wrongGuessCount].name));
    }

    setGuessed((prevGuessed) => [...prevGuessed, letter]);
  }

  function renderGameStatus() {
    if (!isGameOver && wrongGuessCount > 0) {
      return (
        <div className="playing-status">
          <p>{farewellText}</p>
        </div>
      );
    }
    if (isGameWon) {
      return (
        <div className="win-status">
          <p>You win!</p>
          <p>Well done!</p>
        </div>
      );
    } else if (isGameLost) {
      return (
        <div className="lose-status">
          <p>You Lose!</p>
          <p>All hail DR. DOOM!</p>
        </div>
      );
    }
  }

  function handleNewGame() {
    setGuessed([]);
    setFarewellText("");
  }
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
