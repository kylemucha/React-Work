import { useState } from "react";
import { avengers } from "../avengers";
import { clsx } from "clsx";
import Header from "./components/Header";
import Status from "./components/Status";
import AvengerTile from "./components/AvengerTile";

export default function App() {
  // state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessed, setGuessed] = useState([]);

  //derived values
  const wrongGuessCount = guessed.filter((letter) => {
    return !currentWord.includes(letter);
  }).length;

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function populateAllies() {
    return avengers.map((hero, index) => {


    console.log(hero.name, hero.dead)
      return (
        <AvengerTile
          key={hero.name}
          name={hero.name}
          backgroundColor={hero.backgroundColor}
          color={hero.color}
          dead= {index >= wrongGuessCount ? hero.dead : true}
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

  return (
    <main>
      <Header />
      <Status />
      <div className="allies">{populateAllies()}</div>
      <div className="word">{populatedWord}</div>
      <div className="keyboard">{populateKeyboard}</div>
    </main>
  );
}
