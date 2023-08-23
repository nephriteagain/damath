import { data } from "../../../types/types"

export function regularCapture(
  pieceToJump : data,
  index: number,
  board : data[],
  forceFeed : data[],
  number : number
) {

  const pieceToCapture = board[index + number]
  const jumpSquare = board[index + (number * 2)]

  if (
    pieceToJump.piece !== null &&
    jumpSquare?.playable &&
    pieceToCapture?.piece !== null &&
    pieceToCapture?.piece !== pieceToJump.piece &&
    jumpSquare?.piece === null
    ) {
      forceFeed.push(pieceToJump)
    }
}