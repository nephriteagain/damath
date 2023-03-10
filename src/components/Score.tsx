import { useGlobalContext } from '../context/GameContext'
import '../sass/Score.scss'

export function ScoreOne() {

  const { playerOneScore } = useGlobalContext()

  let displayScore = playerOneScore
  if (playerOneScore % 1 !== 0 && playerOneScore.toString().split('.')[1].length >= 3) {
    displayScore = playerOneScore.toFixed(2)
  }

  return (
    <div className="score-one">
      <span className='score-text'>Score:</span><span className='score-span'>
        {displayScore}
      </span>
    </div>
  )
}

export function ScoreTwo() {

  const { playerTwoScore } = useGlobalContext()

  let displayScore = playerTwoScore
  if (playerTwoScore % 1 !== 0 && playerTwoScore.toString().split('.')[1].length >= 3) {
    displayScore = playerTwoScore.toFixed(2)
  }

  return (
    <div className="score-two">
      <span className='score-text'>Score:</span><span className='score-span'>
        {displayScore}
      </span>
    </div>
  )
}

