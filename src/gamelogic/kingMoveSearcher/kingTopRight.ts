import { data } from "../../data/counting"

export function kingTopRight(
  itemToMove: data,
  position: number,
  kingJumpDirection: string|null,
  board: data[],
  tempArrForMoves: data[],
  tempArrForJumps: data[],
  jumpDirection: string[],
  number: number,
  jumped?: boolean
) {

  const movePos = position + number
  const jumpPos = position + (number-7)

  const move = board[movePos]
  const nextMove = board[jumpPos]
  if (movePos > 63 || movePos < 0 || kingJumpDirection === 'bot left') {
    return
  }

  if (
    move?.piece !== null && move?.piece !== itemToMove.piece &&
    nextMove?.playable && nextMove?.piece === null && !jumped   
  ) {
    tempArrForJumps.push(nextMove)
    jumpDirection && jumpDirection.push('top right')
    kingTopRight(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number - 7,
      true
    )
  }
  if (move?.piece === null && move?.playable === true && !jumped) {
    tempArrForMoves.push(move)
    kingTopRight(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number - 7,
    )
  }
  

  if ( move?.piece === null && move?.playable === true && jumped) {
    tempArrForJumps.push(move)
    kingTopRight(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number - 7,
      true
    )
  }
}