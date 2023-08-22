import { data } from "../../data/counting"

export function kingBotRightMulti(
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
  const jumpPos = jumpIndex + (number + 9)

  if (movePos > 63 || movePos < 0 || jumpDirection[index] === 'top left') {
    return
  }

  if (number % 9 !== 0 || number < 0) {
    throw new Error('use number positive divisible by 9')
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
    jumpDirection2nd && jumpDirection2nd.push('bot right')
    doubleTakeLanding && doubleTakeLanding.push(jump)
  }

  if (move?.playable && move?.piece === null) {
    kingBotRightMulti(
      itemToMove,
      index,
      jumpDirection,
      board,
      jumpIndex,
      doubleTakeArr,
      tempArrForJumps,
      number + 9,
      jumpDirection2nd,
      doubleTakeLanding,
    )
  }
  
}