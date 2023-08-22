import { data } from "../../../data/counting"

export function kingTopRightCapture(
  pieceToJump : data,
  index : number,
  board : data[],
  kingJumpDirection : string|null,
  forceFeed : data[],
  number: number
) {

  const movePos = index + number
  const jumpPos = index + (number - 9)

  if (movePos > 63 || movePos < 0 || kingJumpDirection === 'bot left') {
    return
  }

  if (number % 7 !== 0 || number > 0) {
    throw new Error('use number negative divisible by 7')
  }

  const move = board[movePos];
  const jump = board[jumpPos];

  if (
    pieceToJump.piece !== null &&
    move?.piece !== null && move?.piece !== pieceToJump.piece &&
    jump?.playable && jump?.piece === null
  ) {
    forceFeed.push(pieceToJump)
  }

  else if (move?.playable && move?.piece === null) {
    kingTopRightCapture(
      pieceToJump,
      index,
      board,
      kingJumpDirection,
      forceFeed,
      number - 7
    )
  }


  if (number === -7) {
        const moveOne = board[index + number]      
        const moveTwo = board[index + (number * 2)]      
        const moveThree = board[index + (number * 3)]      
        const moveFour = board[index + (number * 4)]      
        const moveFive = board[index + (number * 5)]      
        const moveSix = board[index + (number * 6)]      
        const moveSeven = board[index + (number * 7)]      



       // top left
        if (
        pieceToJump.piece !== null &&
        moveOne?.piece !== null && moveOne?.piece !== pieceToJump.piece &&
        moveTwo?.playable && moveTwo?.piece === null
        && kingJumpDirection !== 'bot left'
        
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.piece !== null && moveTwo?.piece !== pieceToJump.piece &&        
        moveThree?.playable && moveThree?.piece === null
        && kingJumpDirection !== 'bot left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.piece !== null && moveThree?.piece !== pieceToJump.piece &&
        moveFour?.playable && moveFour?.piece === null
        && kingJumpDirection !== 'bot left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null && 
        moveTwo?.playable && moveTwo?.piece === null && 
        moveThree?.playable && moveThree?.piece === null && 
        moveFour?.piece !== null && moveFour?.piece !== pieceToJump.piece && 
        moveFive?.playable && moveFive?.piece === null
        && kingJumpDirection !== 'bot left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.playable && moveThree?.piece === null &&
        moveFour?.playable && moveFour?.piece === null &&
        moveFive?.piece !== null && moveFive?.piece !== pieceToJump.piece &&
        moveSix?.playable && moveSix?.piece === null
        && kingJumpDirection !== 'bot left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.playable && moveThree?.piece === null &&
        moveFour?.playable && moveFour?.piece === null &&
        moveFive?.playable && moveFive?.piece === null &&
        moveSix?.piece !== null && moveFive?.piece !== pieceToJump.piece &&        
        moveSeven?.playable && moveSeven?.piece === null
        && kingJumpDirection !== 'bot left'
        ) {
          forceFeed.push(pieceToJump)
        }
  }
       
}