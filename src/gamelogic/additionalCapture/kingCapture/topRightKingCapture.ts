import { data } from "../../../data/counting"

export function kingTopRightCapture(
  pieceToJump : data,
  index : number,
  board : data[],
  kingJumpDirection : string|null,
  forceFeed : data[],
  number: number
) {

  const movePos = index + number
  const jumpPos = index + (number - 9)

  if (movePos > 63 || movePos < 0 || kingJumpDirection === 'bot left') {
    return
  }

  if (number % 7 !== 0 || number > 0) {
    throw new Error('use number negative divisible by 7')
  }

  const move = board[movePos];
  const jump = board[jumpPos];

  if (
    pieceToJump.piece !== null &&
    move?.piece !== null && move?.piece !== pieceToJump.piece &&
    jump?.playable && jump?.piece === null
  ) {
    forceFeed.push(pieceToJump)
  }

  else if (move?.playable && move?.piece === null) {
    kingTopRightCapture(
      pieceToJump,
      index,
      board,
      kingJumpDirection,
      forceFeed,
      number - 7
    )
  }

       
}