import { useState } from "react";
import { avengers } from "../avengers";
import Header from "./components/Header";
import Status from "./components/Status";
import AvengerTile from "./components/AvengerTile";

export default function App() {
  const [allies, setAllies] = useState(() => populateAllies());
  const [currentWord, setCurrentWord] = useState("React");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function populateAllies() {
    return avengers.map((hero) => {
      return (
        <AvengerTile
          key={hero.name}
          name={hero.name}
          backgroundColor={hero.backgroundColor}
          color={hero.color}
        />
      );
    });
  }

  const populatedWord = [...currentWord]
    .map((letter, index) => {
        return <span key={index}>{letter.toUpperCase()}</span>;
    })

    const populateKeyboard = [...alphabet]
    .map((letter) => {
        return <button className="keyboard-button" key={letter}>{letter.toUpperCase()}</button>
    })

  return (
    <main>
      <Header />
      <Status />
      <div className="allies">{allies}</div>
      <div>{populatedWord}</div>
      <div className="keyboard">{populateKeyboard}</div>
    </main>
  );
}
