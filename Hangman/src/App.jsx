import { useState } from "react";
import { avengers } from "../avengers";
import Header from "./components/Header";
import Status from "./components/Status";
import AvengerTile from "./components/AvengerTile";

export default function App() {
  const [allies, setAllies] = useState(() => populateAllies());

  function populateAllies() {
    return avengers.map((hero) => {
      return (
        <AvengerTile
          name={hero.name}
          backgroundColor={hero.backgroundColor}
          color={hero.color}
        />
      );
    });
  }

  return (
    <main>
      <Header />
      <Status />
      <div className="allies">{allies}</div>
    </main>
  );
}
