import { useState } from "react"
export default function Main() {  

// intialized state for memes

const [meme, setMeme] = useState({
    topText: "What is this...",
    bottomText: "Some kind of Endgame?",
    imageURL: "http://i.imgflip.com/1bij.jpg"
})

function handleChange(event) {
    const {value} = event.currentTarget

    setMeme((prevMeme) => ({
        ...prevMeme,
        topText: value
    }))
}

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>
                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageURL} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}