import { useEffect } from "react"




import { useGlobalContext } from "../context/GameContext"
import Timer from './Timer'
import TimerTwo from "./TimerTwo"
import PlayerTurnBar from "./PlayerTurnBar"
import RestartButton from "./RestartButton"
import ChangeModeButton from "./ChangeModeButton"
import ShowRuleButton from "./ShowRuleButton"
import Board from "./Board"


import '../sass/Gameboard.scss'

interface GameboardProps {
  showRules: () => void
}

function Gameboard({showRules}: GameboardProps) {



  const { 
    playerOneTurn,
    gameMode,
    timerOne,
    setTimerOne,
    timerTwo,
    setTimerTwo,
    isActive,
    currentTimer,
    setCurrentTimer,
    isFirstMove,
    setGameOver,
    setTimesUp,
    timeSup,
  } = useGlobalContext()

  

  function handleNext() {
    if (!playerOneTurn) setCurrentTimer(2)
    if (playerOneTurn) setCurrentTimer(1)
  };
  
  // timer countdown passer
  useEffect(() => {
    if (isFirstMove) return
    handleNext()
  }, [playerOneTurn])
  
  
  // timer countdown handler
  useEffect(() => {
    let interval : any = null;
    if  (isActive && getCurrentTimer() === 0) setTimesUp(true)
    if (isActive && getCurrentTimer() > 0) {
      interval = setInterval(() => {
        if (currentTimer === 1) {
          setTimerOne(timerOne => timerOne - 1);
        } else {
          setTimerTwo(timerTwo => timerTwo - 1);
        } 
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timerOne, timerTwo, currentTimer]);

  function getCurrentTimer() {
    return currentTimer === 1 ? timerOne : timerTwo;
  };


  // game over handler
  useEffect(() => {
    if (timeSup) setGameOver(true)
  }, [timeSup])




  return (
    <div className="container"> 
      <PlayerTurnBar />
      <RestartButton />
      <ChangeModeButton />
      <ShowRuleButton showRules={showRules}/>
      <TimerTwo 
        timerTwo={timerTwo} 
        currentTimer={currentTimer} 
      />

      { gameMode && <div className="current-game-mode">
          Game Mode: <span>{gameMode.toUpperCase()}</span>
      </div> }
      <Board />
      <Timer 
        timerOne={timerOne} 
        currentTimer={currentTimer}
      />
    </div>
  )
}

export default Gameboard