import { useEffect } from 'react'
import { useGlobalContext } from "../context/GameContext"

import '../sass/WinnerModal.scss'


function WinnerModal() {


  const { playerOneTurn, handleRestart, gameMode, timeSup, playerOneScore, playerTwoScore, boardData, gameOver, setPlayerOneScore, setPlayerTwoScore } = useGlobalContext()


  useEffect(() => {
  if (!gameOver) return

  let totalOne = playerOneScore
  let totalTwo = playerTwoScore
  
  boardData.forEach(item => {
    if (!item?.playable) return
    if (item?.piece === null) return

    if (item?.piece === 'z' && !item?.king) {
      totalOne = totalOne +  item?.value
    }
    if (item?.piece === 'z' && item?.king) {
      totalOne = totalOne +  (item?.value * 2)
    }
    if (item?.piece === 'x' && !item?.king) {
      totalTwo = totalTwo +  item?.value
    }
    if (item?.piece === 'x' && item?.king) {
      totalTwo = totalTwo +  (item?.value * 2)
    }
    
  })

  setPlayerOneScore(totalOne)
  setPlayerTwoScore(totalTwo)

  }, [gameOver])
  // if (timeSup) {
  //   return (
  //   <div className='modal-background'>
  //     <div className='winner-modal'>
  //       <p>
  //       {playerOneTurn ? 'PLAYER TWO WIN!' : 'PLAYER ONE WIN!'} 
  //       </p>
  //       <button className="btn-new-game"
  //         onClick={handleRestart}
  //       >
  //         New Game
  //       </button>
  //     </div>
  //   </div>  
  //   )
  // }


  // else if (gameMode === 'dama') {
  //   return (
  //   <div className='modal-background'>
  //     <div className='winner-modal'>
  //       <p>
  //       {playerOneTurn ? 'PLAYER TWO WIN!' : 'PLAYER ONE WIN!'} 
  //       </p>
  //       <button className="btn-new-game"
  //         onClick={handleRestart}
  //       >
  //         New Game
  //       </button>
  //     </div>
  //   </div>  
  //   )
  // }
  // else if (gameMode === 'perdigana') {
  //   return (
  //   <div className='modal-background'>
  //     <div className='winner-modal'>
  //       <p>
  //       {!playerOneTurn ? 'PLAYER TWO WIN!' : 'PLAYER ONE WIN!'} 
  //       </p>
  //       <button className="btn-new-game"
  //         onClick={handleRestart}
  //       >
  //         New Game
  //       </button>
  //     </div>
  //   </div>  
  //   )
  // }
  return (
    <div className='modal-background'>
      <div className='winner-modal'>
        <p>
        {playerOneScore > playerTwoScore && 'PLAYER ONE WINS!'}
        {playerOneScore < playerTwoScore && 'PLAYER TWO WINS!'}
        {playerOneScore === playerTwoScore && 'TIE!'}
        </p>
        <button className="btn-new-game"
        onClick={handleRestart}
        >
        New Game
        </button>
      </div>
    </div>  
    )


}

export default WinnerModal