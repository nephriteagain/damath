import { useGlobalContext } from '../context/GameContext'

import '../sass/Gameboard.scss'
import { actionType } from '../types/types'


function ChangeModeButton() {

  const {handleRestart, handleReset, dispatch} = useGlobalContext()

  function changeGameMode() {
    dispatch({type: actionType.setGameMode})
  }
  
  return (
    <div className="change-mode">
      <button className="btn-mode"
        onClick = {
          () => {
            handleRestart()
            handleReset()
            changeGameMode()
          }
        }
      >
        Change Game Mode
      </button>
    </div>
  )
}

export default ChangeModeButton