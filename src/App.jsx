// Css
import './App.css'

//React
import { useCallback, useEffect, useState } from 'react'

//Data
import { wordsList } from "./data/words.jsx"

//Components
import StartScreen from './components/StartScreen'
import Game from './components/Game.jsx';
import GameOver from './components/GameOver.jsx';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuesedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = useCallback(() => {
    //Escolhendo a categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Escolhendo a palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])

  //Inicia o jogo
  const startGame = useCallback(() => {
    clearLetterStates()

    //Escolhe uma palavra e uma categoria
    const { word, category } = pickWordAndCategory()

    //Divide a palavra em um vetor de letras e deixa todas elas minusculas
    let wordLetters = word.split("").map(a => a.toLowerCase())

    //Preenche os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  //Processa a letra que o usuário insere
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //Verfica se a letra ja foi ultilizada
    if (guessedLetters.includes(normalizedLetter)
      || wrongLetters.includes(normalizedLetter)) {
      return
    }
    if (letters.includes(normalizedLetter)) {
      setGuesedLetters((actualGuessedLetter) => [
        ...actualGuessedLetter, normalizedLetter,
      ])
    }
    else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }
  const clearLetterStates = () => {
    setGuesedLetters([])
    setWrongLetters([])
  };


  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((scoreAtual) => (scoreAtual += 100))
      startGame()
    }
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }
  return (
    <>
      <div className='App'>
        {gameStage === "start" && <StartScreen startGame={startGame} />}

        {gameStage === "game" && <Game verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score} />}

        {gameStage === "end" && <GameOver retry={retry} score={score} />}

      </div>

    </>
  )
}

export default App
