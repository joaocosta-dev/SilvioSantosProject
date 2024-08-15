import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
      <h1>Roda Roda Jequiti</h1>
      <p>Clique no botão abaixo para iniciar o jogo</p>
      <button onClick={startGame}>Estou pronto para jogar! </button>
    </div>
  )
}

export default StartScreen
