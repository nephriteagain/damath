import { data, kingJumpDirection } from "../../../types/types"
export function kingBotLeftCapture(
  pieceToJump: data,
  index : number,
  board : data[],
  kingJumpDirection : kingJumpDirection,
  forceFeed : data[],
  number: number
) {

  const movePos = index + number
  const jumpPos = index + (number + 7)

  if (movePos > 63 || movePos < 0 || kingJumpDirection === 'top right') {
    return
  }

  if (number % 7 !== 0 || number < 0) {
    throw new Error('use number positive divisible by 7')
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
    kingBotLeftCapture(
      pieceToJump,
      index,
      board,
      kingJumpDirection,
      forceFeed,
      number + 7
    )
  }

}