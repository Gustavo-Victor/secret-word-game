import "./End.css"; 
/* eslint-disable react/prop-types */


const End = ({retry, word, score}) => {
  return (
    <div className="game-over-container">
      <h1>Game Over!</h1>
      <h2>Final score: <span>{score}</span></h2>
      <p>The secret word is <span>{word}</span> </p>
      <button onClick={retry}>Try again</button>
    </div>
  )
}

export default End; 
