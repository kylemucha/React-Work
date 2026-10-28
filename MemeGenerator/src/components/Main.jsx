import { useState } from "react";
import { useEffect } from "react";
export default function Main() {
  /**
   * Challenge:
   * Get an array of memes from the imgflip API as soon as
   * this component renders for the first time.
   * Check the imgflip documentation for the correct URL.
   * Save the array of memes (not the whole response
   * data) to state. (For this app, we'll randomly choose
   * one of the memes from this array when the user clicks
   * the "Get a new meme image" button, but we'll do that in
   * a separate challenge.)
   *
   * Hint: for now, don't try to use an async/await function.
   * Instead, use `.then()` to resolve the promises
   * from using `fetch`. We'll learn why after this challenge.
   */

  const [meme, setMeme] = useState({
    topText: "What is this...",
    bottomText: "Some kind of Endgame?",
    imageURL: "http://i.imgflip.com/1bij.jpg",
  });

  const [memeList, setMemeList] = useState([]);



  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((result) => result.json())
      .then(list => setMemeList(list.data.memes))
  }, []);

  function handleChange(event) {
    const { value, name } = event.currentTarget;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleClick() {
    const curr = Math.floor(Math.random() * memeList.length);
    const newMeme = memeList[curr].url
    console.log(newMeme)
    setMeme((prevMeme) => ({
        ...prevMeme,
        imageURL: newMeme
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
          />
        </label>
        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleClick}>
            Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.imageURL} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
