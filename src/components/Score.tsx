import '../sass/Score.scss'


export function ScoreOne({playerOneScore}) {

  return (
    <div className="score-one">{playerOneScore}</div>
  )
}

export function ScoreTwo({playerTwoScore}) {
  return (
    <div className="score-two">{playerTwoScore}</div>
  )
}

