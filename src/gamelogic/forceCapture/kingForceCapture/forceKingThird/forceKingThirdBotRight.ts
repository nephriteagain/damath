import { data } from "../../../../data/counting"

export function forceKingThirdBotRight(
  item : data,
  index : number,
  boardData : data[],
  jumpIndex : number,
  jumpDirection2nd : string[],
  forceFeed3rd : data[],
  forceFeed2nd : data[],
  number : number
) {                                
  if (!item?.king) return


  const movePos = index + number;
  const jumpPos = index + (number + 9)

  if (movePos > 63 || movePos < 0 || jumpDirection2nd[index] === 'top left') {
    return
  }

  if (number % 9 !== 0 || number < 0) {
    throw new Error('use number positive divisible by 9')
  }

  const move = boardData[movePos];
  const jump = boardData[jumpPos];

  if (
    move?.piece !== null && move?.piece !== item?.piece &&
    jump?.playable && jump?.piece === null
  ) {
    forceFeed3rd.push(forceFeed2nd[index])
  }

  if (move?.piece === null && move?.playable) {
    forceKingThirdBotRight(
      item ,
      index ,
      boardData ,
      jumpIndex ,
      jumpDirection2nd ,
      forceFeed3rd ,
      forceFeed2nd ,
      number + 9
    )
  }

}