import { data } from "../../types/types"
export function checkForJumps(
  itemToCheck: data,
  position: number,
  board: data[],
  storeArr: data[], 
  number: number,
  directionArr: string []
) {
  const pieceToEat = board[position + number]
  const jumpSquare = board[position + ( number * 2)]

  if (
    jumpSquare?.playable &&
    jumpSquare?.piece === null &&
    pieceToEat?.piece !== null &&
    pieceToEat?.piece !== itemToCheck?.piece
  ) {
    storeArr.push(jumpSquare)
    if (number === -7 ) directionArr.push('top right')
    if (number === -9 ) directionArr.push('top left')
    if (number === 7 ) directionArr.push('bot left')
    if (number === 9 ) directionArr.push('bot right')
  }
}