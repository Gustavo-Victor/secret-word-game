/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import "./Game.css";
/* eslint-disable react/prop-types */


const Game = ({
  category,
  word,
  letters,
  wrongLetters,
  guessedLetters,
  score,
  attempts,
  verifyLetter }) => {
  const [letter, setLetter] = useState("");
  const letterInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInput.current.focus();
  }

  const handleChangeLetter = (e) => {
    setLetter(e.target.value);
  }

  return (
    <div className="game">
      <p className="points">
        <span>Ponctuation: {score}</span>
      </p>
      <h1>Guess the word: </h1>
      <h3 className="tip">Tip: <span>{category}</span></h3>
      <p>{attempts} attempts left</p>
      <div className="word-container">
        {letters.map((letter, index) => (
          guessedLetters.includes(letter)
            ? (<span key={index} className="letter">{letter}</span>)
            : (<span key={index} className="blank-square"></span>)
        ))}
      </div>
      <div className="letter-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            value={letter || ""}
            onChange={handleChangeLetter}
            id="letter"
            maxLength={1}
            required
            ref={letterInput} />
          <button type="submit">Play</button>
        </form>
      </div>
      <div className="wrong-letter-container">
        <p>Used letters: </p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game; 
