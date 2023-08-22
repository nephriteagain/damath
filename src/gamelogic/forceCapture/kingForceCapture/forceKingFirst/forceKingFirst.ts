import { data } from "../../../../data/counting"

export function forceKingCapture(
  item : data,
  index : number,
  boardData : data[],
  forceFeed : data[],
  jumpDirection : string[],
  jumpedArr : data[],
  number : number
) {
  if (!item.king) return

  const toAdd = (number % 7 === 0 && number > 0) ? 7 :
              (number % 7 === 0 && number < 0) ? -7 :
              (number % 9 === 0 && number > 0) ? 9 : -9;

  const movePos = index + number
  const jumpPos = index + (number + toAdd)

  if (movePos > 63 || movePos < 0) {
    return
  }

  if (number % 7 !== 0 && number % 9 !== 0) {
    throw new Error('use numbers 7, -7, 9, -9')
  }

  const move = boardData[movePos];
  const jump = boardData[jumpPos];

  if (
    item.piece !== null &&
    move?.piece !== null && move?.piece !== item.piece &&
    jump?.playable && jump?.piece === null
  ) {
    forceFeed.push(item)
    jumpedArr.push(jump)
    number === -7 && jumpDirection.push('top right')
    number === -9  && jumpDirection.push('top left')
    number === 7  && jumpDirection.push('bot left')
    number === 9  && jumpDirection.push('bot right')
  }
  if (move?.playable && move?.piece === null) {
    forceKingCapture(
      item,
      index,
      boardData,
      forceFeed,
      jumpDirection,
      jumpedArr,
      number + toAdd
    )
  }

}