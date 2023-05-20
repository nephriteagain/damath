import { data } from "../../../data/counting"

export function kingTopLeftCapture(
  pieceToJump : data,
  index : number,
  board : data[],
  kingJumpDirection : string|null,
  forceFeed : data[],
  number: number
) {
  if (number === -9) {
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
        && kingJumpDirection !== 'bot right'
        
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.piece !== null && moveTwo?.piece !== pieceToJump.piece &&        
        moveThree?.playable && moveThree?.piece === null
        && kingJumpDirection !== 'bot right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.piece !== null && moveThree?.piece !== pieceToJump.piece &&
        moveFour?.playable && moveFour?.piece === null
        && kingJumpDirection !== 'bot right'

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
        && kingJumpDirection !== 'bot right'

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
        && kingJumpDirection !== 'bot right'

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
        && kingJumpDirection !== 'bot right'
        ) {
          forceFeed.push(pieceToJump)
        }
  }
       
}