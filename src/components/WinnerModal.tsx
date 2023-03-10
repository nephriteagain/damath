import { useEffect, useState } from 'react'
import { useGlobalContext } from "../context/GameContext"

import '../sass/WinnerModal.scss'


function WinnerModal() {

  const [ playerOneRemain, setPlayerOneRemain ] = useState([])
  const [ playerTwoRemain, setPlayerTwoRemain ] = useState([])

  const [ remainOneTotal, setRemainOneTotal] = useState(0)
  const [ remainTwoTotal, setRemainTwoTotal] = useState(0)

  const [ oneGrandTotal, setOneGrandTotal ] = useState(0)
  const [ twoGrandTotal, setTwoGrandTotal ] = useState(0)

  const { playerOneTurn, handleRestart, gameMode, timeSup, playerOneScore, playerTwoScore, boardData, gameOver, setPlayerOneScore, setPlayerTwoScore } = useGlobalContext()


  

  useEffect(() => {
  if (!gameOver) return

  let totalOne = 0
  let totalTwo = 0
  
  let remainingChipsOne = []
  let remainingChipsTwo = []

  boardData.forEach(item => {
    if (!item?.playable) return
    if (item?.piece === null) return

    if (item?.piece === 'z' && !item?.king) {
      totalOne = totalOne +  item?.value
      remainingChipsOne.push({value: item?.value, type: 'normal'})
    }
    if (item?.piece === 'z' && item?.king) {
      totalOne = totalOne +  (item?.value * 2)
      remainingChipsOne.push({value: item?.value, type: 'king'})
    }
    if (item?.piece === 'x' && !item?.king) {
      totalTwo = totalTwo +  item?.value
      remainingChipsTwo.push({value: item?.value, type: 'normal'})

    }
    if (item?.piece === 'x' && item?.king) {
      totalTwo = totalTwo +  (item?.value * 2)
      remainingChipsTwo.push({value: item?.value, type: 'king'})
    }
    
  })

  setRemainOneTotal(totalOne)
  setRemainTwoTotal(totalTwo)

  setPlayerOneRemain(remainingChipsOne)
  setPlayerTwoRemain(remainingChipsTwo)

  setOneGrandTotal(totalOne + playerOneScore)
  setTwoGrandTotal(totalTwo + playerTwoScore)

  }, [gameOver])

  let displayScoreOne = playerOneScore
  if (playerOneScore % 1 !== 0 && playerOneScore.toString().split('.')[1]?.length >= 3) {
    displayScoreOne = playerOneScore.toFixed(2)
  }

  let displayScoreTwo = playerTwoScore
  if (playerTwoScore % 1 !== 0 && playerTwoScore.toString().split('.')[1]?.length >= 3) {
    displayScoreTwo = playerTwoScore.toFixed(2)
  }

   let displayTotalOne : (number|string) = oneGrandTotal
  if (oneGrandTotal % 1 !== 0 && oneGrandTotal.toString().split('.')[1]?.length >= 3) {
    displayTotalOne = oneGrandTotal.toFixed(2)
  }

  let displayTotalTwo : (number|string) = twoGrandTotal
  if (twoGrandTotal % 1 !== 0 && twoGrandTotal.toString().split('.')[1]?.length >= 3) {
    displayTotalTwo = twoGrandTotal.toFixed(2)
  }

  return (
    <div className='modal-background'>
      <div className='winner-modal'>
        <p className='game-result'>
        {oneGrandTotal > twoGrandTotal && 'PLAYER ONE WINS!'}
        {twoGrandTotal > oneGrandTotal && 'PLAYER TWO WINS!'}
        {oneGrandTotal === twoGrandTotal && 'TIE!'}
        </p>
        <p className='score-p1'>Player One Score: <span className='scores'>{displayScoreOne}</span></p>
        <p className='score-p1'>Player One Remaining Chips Total: <span className='scores'>{remainOneTotal}</span></p>
        <p className='score-p1 total'>Player One Total Score: <span className='scores total'>{displayTotalOne}</span></p>

        {playerOneRemain.length && 
        <div className='chips-p1'>
          {playerOneRemain.map((item,index) => {
            if (item.type === 'normal') return <div className='p1' key={index}>{item.value}</div>
            if (item.type === 'king') return <div className='p1 king' key={index}>{item.value}</div>
          })}
        </div>}

        <p className='score-p2'>Player Two Score: <span className='scores'>{displayScoreTwo}</span></p>
        <p className='score-p2'>Player Two Remaining Chips Total: <span className='scores'>{remainTwoTotal}</span></p>
        <p className='score-p2 total'>Player Two Total Score: <span className='scores total'>{displayTotalTwo}</span></p>

        {playerTwoRemain.length && 
        <div className='chips-p2'>
          {playerTwoRemain.map((item,index) => {
            if (item.type === 'normal') return <div className='p2' key={index}>{item.value}</div>
            if (item.type === 'king') return <div className='p2 king' key={index}>{item.value}</div>
          })}
        </div>}

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