import { data } from "../../../../types/types";
export function forceKingTopRight(
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
  const jumpPos = index + (number - 7)

  if (movePos > 63 || movePos < 0 || jumpDirection[index] === 'bot left') {
    return
  }

  if (number % 7 !== 0 || number > 0) {
    throw new Error('use number negative divisible by 7')
  }

  const move = boardData[movePos];
  const jump = boardData[jumpPos];

  if (
    move?.piece !== null && move?.piece !== itemToMove?.piece &&
    jump?.playable && jump?.piece === null
  ) {
    jumpedArr2nd.push(jump)
    forceFeed2nd.push(forceFeed[index])
    number % 7 === 0 && number < 0 && jumpDirection2nd.push('top right')
  }
  
  if (move?.piece === null && move?.playable) {
    forceKingTopRight(
      itemToMove,
      index,
      boardData,
      jumpIndex,
      jumpDirection,
      jumpedArr2nd,
      jumpDirection2nd,
      forceFeed2nd,
      forceFeed,
      number - 7
    )
  }

}