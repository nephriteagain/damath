import { kingJumpDirection, data } from './../../types/types';

export function kingTopLeft(
  itemToMove: data,
  position: number,
  kingJumpDirection: kingJumpDirection,
  board: data[],
  tempArrForMoves: data[],
  tempArrForJumps: data[],
  jumpDirection: string[],
  number: number,
  jumped?: boolean
) {

  const movePos = position + number
  const jumpPos = position + (number-9)

  if (movePos > 63 || movePos < 0 || kingJumpDirection === 'bot right') {
    return
  }

  const move = board[movePos]
  const nextMove = board[jumpPos]

  if (
    move?.piece !== null && move?.piece !== itemToMove.piece &&
    nextMove?.playable && nextMove?.piece === null && !jumped   
  ) {
    tempArrForJumps.push(nextMove)
    jumpDirection && jumpDirection.push('top left')
    kingTopLeft(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number - 9,
      true
    )
  }
  if (move?.piece === null && move?.playable === true && !jumped) {
    tempArrForMoves.push(move)
    kingTopLeft(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number - 9,
    )
  }
  

  if ( move?.piece === null && move?.playable === true && jumped) {
    tempArrForJumps.push(move)
    kingTopLeft(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number - 9,
      true
    )
  }
}