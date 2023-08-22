import { data } from "../../data/counting"

export function kingBotLeft(
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
  const jumpPos = position + (number+7)
  if (movePos > 63 || movePos < 0 ||kingJumpDirection === 'top right') {
    return
  }

  const move = board[movePos]
  const nextMove = board[jumpPos]
  if (
    nextMove && move?.piece !== null && move?.piece !== itemToMove.piece &&
    nextMove?.playable && nextMove?.piece === null && !jumped   
  ) {
    tempArrForJumps.push(nextMove)
    jumpDirection && jumpDirection.push('bot left')
    kingBotLeft(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number + 7,
      true
    )
  }     
  if (move?.piece === null && move?.playable === true && !jumped) {
    tempArrForMoves.push(move)
    kingBotLeft(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number + 7,
    )
  }
  
  if ( move?.piece === null && move?.playable === true && jumped) {
    tempArrForJumps.push(move)
    kingBotLeft(
      itemToMove,
      position,
      kingJumpDirection,
      board,
      tempArrForMoves,
      tempArrForJumps,
      jumpDirection,
      number + 7,
      true
    )
  }
      
}