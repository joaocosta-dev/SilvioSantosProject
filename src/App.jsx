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


  const pickWordAndCategory = () => {
    //Escolhendo a categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Escolhendo a palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]
  
    return {word,category}
  }

  //Inicia o jogo
  const startGame = () => {
    //Escolhe uma palavra e uma categoria
    

    const {word, category} = pickWordAndCategory()
    setGameStage(stages[1].name)
  }

  //Processa a letra que o usuário insere
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }
  return (
    <>
      <div className='App'>
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
        {gameStage === "end" && <GameOver retry={retry} />}

      </div>

    </>
  )
}

export default App
