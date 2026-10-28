import { useState } from "react";
import { useEffect } from "react";
export default function Main() {

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
