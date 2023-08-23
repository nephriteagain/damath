import { data } from "../../types/types"
export function checkForMultiJumps(
  itemToMove : data,
  index : number,
  arrToJumpIndices : number[],
  board : data[],
  jumpDirection : string[],
  doubleTakeArr: data[],
  number : number,
  tempArrForJumps : data[],
  jumpDirection2nd? : string[],
  tempArrForJumps2? : data[]
) {
  const jumpIndex = arrToJumpIndices[index]
  const jumpSquare = board[jumpIndex + (number * 2)]
  const pieceToEat = board[jumpIndex + number]
  const direction = jumpDirection[index]

  if (number === -7) {
    if (
    jumpSquare?.playable &&
    jumpSquare?.piece === null &&
    pieceToEat?.piece !== null &&
    pieceToEat?.piece !== itemToMove?.piece &&
    direction !== 'bot left'
    ) {
      doubleTakeArr.push(tempArrForJumps[index])
      jumpDirection2nd && jumpDirection2nd.push('top right')
      tempArrForJumps2 && tempArrForJumps2.push(jumpSquare)
    }
  }

  if (number === -9) {
    if (
    jumpSquare?.playable &&
    jumpSquare?.piece === null &&
    pieceToEat?.piece !== null &&
    pieceToEat?.piece !== itemToMove?.piece &&
    direction !== 'bot right'
    ) {
      doubleTakeArr.push(tempArrForJumps[index])
      jumpDirection2nd && jumpDirection2nd.push('top left')
      tempArrForJumps2 && tempArrForJumps2.push(jumpSquare)
    }
  }

  if (number === 7) {
    if (
    jumpSquare?.playable &&
    jumpSquare?.piece === null &&
    pieceToEat?.piece !== null &&
    pieceToEat?.piece !== itemToMove?.piece &&
    direction !== 'top right'
    ) {
      doubleTakeArr.push(tempArrForJumps[index])
      jumpDirection2nd && jumpDirection2nd.push('bot left')
      tempArrForJumps2 &&  tempArrForJumps2.push(jumpSquare)
    }
  }

  if (number === 9) {
    if (
    jumpSquare?.playable &&
    jumpSquare?.piece === null &&
    pieceToEat?.piece !== null &&
    pieceToEat?.piece !== itemToMove?.piece &&
    direction !== 'top left'
    ) {
      doubleTakeArr.push(tempArrForJumps[index])
      jumpDirection2nd && jumpDirection2nd.push('bot right')
      tempArrForJumps2 && tempArrForJumps2.push(jumpSquare)
    }
  }
  

}