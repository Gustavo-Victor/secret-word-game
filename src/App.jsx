import { useState, useEffect, useCallback } from "react";
import { wordsList } from "./data/words";
import StartScreen from './components/StartScreen';
import Game from "./components/Game";
import End from "./components/End";
import './App.css';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];


export default function App() {
  const numAttempts = 3;
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenWord, setChosenWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [attempts, setAttempts] = useState(numAttempts);
  const [score, setScore] = useState(0);

  const selectWordAndCategory = useCallback(() => {
    // pick category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // pick word
    const possibleWords = words[category];
    const word = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    return { word, category };
  }, [words])

  const startGame = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);
    const { word, category } = selectWordAndCategory();
    const wordLetters = word.split('');
    const formattedWordLetters = wordLetters.map(letter => letter.toLowerCase());

    setChosenCategory(category);
    setChosenWord(word);
    setLetters(formattedWordLetters);
    setGameStage(stages[1].name);
  }, [selectWordAndCategory])

  const retry = () => {
    setChosenCategory("");
    setChosenWord("");
    setAttempts(numAttempts);
    setScore(0);
    setGameStage(stages[0].name);
  }

  const verifyLetter = (letter) => {
    const formattedLetter = letter.toLowerCase();

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }

    if (letters.includes(formattedLetter)) {
      setGuessedLetters(prevState => [...prevState, formattedLetter]);
    } else {
      setWrongLetters(prevState => [...prevState, formattedLetter]);
      setAttempts(prevState => prevState - 1);
    }
  }

  useEffect(() => {
    if (attempts <= 0) {
      setGameStage(stages[2].name);
      setGuessedLetters([]);
      setWrongLetters([]);
    }
  }, [attempts]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length != 0 && uniqueLetters.length != 0) {
      if (guessedLetters.length == uniqueLetters.length) {
        setScore(prevState => prevState + 100);
        setAttempts(numAttempts);
        startGame();
      }
    }

  }, [guessedLetters, letters, startGame]);


  return (
    <div className="App">
      {gameStage === "start" &&
        <StartScreen startGame={startGame} />}

      {gameStage === "game" &&
        <Game
          attempts={attempts}
          score={score}
          category={chosenCategory}
          word={chosenWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          verifyLetter={verifyLetter} />}

      {gameStage === "end" &&
        <End
          retry={retry}
          word={chosenWord}
          score={score} />}
    </div>
  )
}


