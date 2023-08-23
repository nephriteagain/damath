import { data } from "../../../../types/types";
export function forceKingTopLeft(
  itemToMove : data,
  index : number,
  boardData : data[],
  jumpIndex : number,
  jumpDirection : string[],
  jumpedArr2nd : data[],
  jumpDirection2nd : string[],
  forceFeed2nd : data[],
  forceFeed : data[],
  number : number
) {

  if (!itemToMove.king) return

  const movePos = index + number;
  const jumpPos = index + (number - 9)

  if (movePos > 63 || movePos < 0 || jumpDirection[index] === 'bot right') {
    return
  }

  if (number % 9 !== 0 || number > 0) {
    throw new Error('use number negative divisible by 9')
  }

  const move = boardData[movePos];
  const jump = boardData[jumpPos];

  if (
    move?.piece !== null && move?.piece !== itemToMove?.piece &&
    jump?.playable && jump?.piece === null
  ) {
    jumpedArr2nd.push(jump)
    forceFeed2nd.push(forceFeed[index])
    number % 9 === 0 && number < 0 && jumpDirection2nd.push('top left')
  }

  if (move?.piece === null && move?.playable) {
    forceKingTopLeft(
      itemToMove,
      index,
      boardData,
      jumpIndex,
      jumpDirection,
      jumpedArr2nd,
      jumpDirection2nd,
      forceFeed2nd,
      forceFeed,
      number - 9
    )
  }


  
}