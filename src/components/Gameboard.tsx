import { useEffect } from "react"




import { useGlobalContext } from "../context/GameContext"
import Timer from './Timer'
import TimerTwo from "./TimerTwo"
import PlayerTurnBar from "./PlayerTurnBar"
import RestartButton from "./RestartButton"
import ChangeModeButton from "./ChangeModeButton"
import ShowRuleButton from "./ShowRuleButton"
import Board from "./Board"

import { actionType } from "../types/types"

import '../sass/Gameboard.scss'

interface GameboardProps {
  showRules: () => void
}

function Gameboard({showRules}: GameboardProps) {



  const { 
    playerOneTurn,
    gameMode,
    timerOne,
    timerTwo,
    isActive,
    currentTimer,
    isFirstMove,
    timeSup,
    dispatch,
  } = useGlobalContext()

  

  function handleNext() {
    dispatch({type: actionType.changeCurrentTime})
  };
  
  // timer countdown passer
  useEffect(() => {
    if (isFirstMove) return
    handleNext()
  }, [playerOneTurn])
  
  
  // timer countdown handler
  useEffect(() => {
    let interval : any = null;
    if  (isActive && getCurrentTimer() === 0) {
      dispatch({type: actionType.timesUp})
    }
    if (isActive && getCurrentTimer() > 0) {
      interval = setInterval(() => {
        if (currentTimer === 1) {
          dispatch({
            type: actionType.setTimerOne,
            payload: {
              timerOne: timerOne - 1
            }
          })
        } else {
          dispatch({
            type: actionType.setTimerTwo,
            payload: {
              timerTwo: timerTwo - 1
            }
          })
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
    if (timeSup) {
      dispatch({type: actionType.gameOver})
    }
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