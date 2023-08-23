import { data } from "../../types/types"
export function kingBotLeftMulti(
  itemToMove: data,
  index: number,
  jumpDirection: string[],
  board: data[],
  jumpIndex: number,
  doubleTakeArr: data[],
  tempArrForJumps: data[],
  number: number,
  jumpDirection2nd?: string[],
  doubleTakeLanding?: data[],
) {

  const movePos = jumpIndex + number
  const jumpPos = jumpIndex + (number + 7)

  if (movePos > 63 || movePos < 0 || jumpDirection[index] === 'top right') {
    return
  }

  if (number % 7 !== 0 || number < 0) {
    throw new Error('use number positive divisible by 7')
  }

  const move = board[movePos]
  const jump = board[jumpPos]

  if (
    move?.piece !== itemToMove?.piece &&
    move?.piece !== null &&
    move?.playable &&
    jump?.playable &&
    jump?.piece === null
  ) {
    doubleTakeArr.push(tempArrForJumps[index])
    jumpDirection2nd && jumpDirection2nd.push('bot left')
    doubleTakeLanding && doubleTakeLanding.push(jump)
  }

  if (move?.playable && move?.piece === null) {
    kingBotLeftMulti(
      itemToMove,
      index,
      jumpDirection,
      board,
      jumpIndex,
      doubleTakeArr,
      tempArrForJumps,
      number + 7,
      jumpDirection2nd,
      doubleTakeLanding,
    )
  }

}