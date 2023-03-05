import { useGlobalContext } from '../context/GameContext'
import '../sass/Score.scss'

export function ScoreOne() {

  const { playerOneScore } = useGlobalContext()

  return (
    <div className="score-one">
      <span className='score-text'>Score:</span><span className='score-span'>{playerOneScore}</span>
    </div>
  )
}

export function ScoreTwo() {

  const { playerTwoScore } = useGlobalContext()

  return (
    <div className="score-two">
      <span className='score-text'>Score:</span><span className='score-span'>{playerTwoScore}</span>
    </div>
  )
}

