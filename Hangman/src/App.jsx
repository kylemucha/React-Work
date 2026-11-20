import { useState } from "react";
import { avengers } from "../avengers";
import { getFarewellText, getWord } from "../utils";
import { clsx } from "clsx";
import { Analytics } from "@vercel/analytics/next";
import Header from "./components/Header";
import AvengerTile from "./components/AvengerTile";
import Confetti from "react-confetti";

/**
 * features to add
 * - choose a random word instead of a set word
 * - confetti drop on win
 */

export default function App() {
  // state variables
  const [currentWord, setCurrentWord] = useState(getWord);
  const [guessed, setGuessed] = useState([]);
  const [farewellText, setFarewellText] = useState("");

  //derived variables
  const wrongGuessCount = guessed.filter((letter) => {
    return !currentWord.includes(letter);
  }).length;
  const guessesLeft = avengers.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessed.includes(letter));
  const isGameLost = wrongGuessCount >= guessesLeft;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessed[guessed.length - 1];

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
      <span
        key={index}
        className={clsx({
          "letter-wrong": !guessed.includes(letter) && isGameOver,
        })}
      >
        {guessed.includes(letter) || isGameOver
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
        aria-disabled={guessed.includes(letter)}
        aria-label={`Letter ${letter}`}
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
          <p>Well done! 🎉</p>
        </div>
      );
    } else if (isGameLost) {
      return (
        <div className="lose-status">
          <p>You Lose!</p>
          <p>All hail DR. DOOM! 🧎</p>
        </div>
      );
    }
  }

  function handleNewGame() {
    setGuessed([]);
    setFarewellText("");
    setCurrentWord(getWord());
  }
  return (
    <main>
      {isGameWon && <Confetti />}
      <Header />
      <div aria-live="polite" role="status">
        {renderGameStatus()}
      </div>
      <div className="allies">{populateAllies()}</div>
      <div className="word">{populatedWord}</div>

      {/** This section is combined visually-hidden aria-live region for status updates */}
      <div className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {guessesLeft} guesses left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessed.includes(letter) ? letter + "." : "blank.",
            )
            .join(" ")}
        </p>
      </div>
      <div className="keyboard">{populateKeyboard}</div>
      {isGameOver && (
        <button className="new-game" onClick={handleNewGame}>
          New Game
        </button>
      )}
      <Analytics />
    </main>
  );
}
