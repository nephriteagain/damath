import { kingJumpDirection, data } from "../../../types/types"
export function kingBotRightCapture(
  pieceToJump : data,
  index : number,
  board : data[],
  kingJumpDirection : kingJumpDirection,
  forceFeed : data[],
  number : number
) {

  const movePos = index + number
  const jumpPos = index + (number + 9)

  if (movePos > 63 || movePos < 0 || kingJumpDirection === 'top left') {
    return
  }

  if (number % 9 !== 0 || number < 0) {
    throw new Error('use number positive divisible by 9')
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
    kingBotRightCapture(
      pieceToJump,
      index,
      board,
      kingJumpDirection,
      forceFeed,
      number + 9
    )
  }
     
}