import { data } from "../../types/types"
export function solve(chipToBeTaken : data, pieceToMove : data, placeToLand: data) {
  if (!chipToBeTaken?.piece) return
  let total = 0
  const capturedValue : number= chipToBeTaken.value as number
  const moveValue : number = pieceToMove.value as number
  const operation : string = placeToLand.operation as string

  if (operation === 'add') {
    total = moveValue + capturedValue
  }
  else if (operation === 'subtract') {
    total = moveValue - capturedValue
  }
  else if (operation === 'multiply') {
    total = moveValue * capturedValue

  }
  else if (operation === 'divide') {
    total = moveValue / capturedValue
    if (total === Infinity) total = 0 // divided by zero
  }
  
  if (chipToBeTaken.king) total = total * 2 // normal piece eats king
  if (pieceToMove.king) total = total * 2 // king eats normal piece
  // if both chip to be taken and chip to jump are king, score is x4

  let index = total.toString().indexOf('.')
  if (index !== -1) {
    if (total.toString().split('.')[1]?.length > 2) {
      let temp = total.toFixed(2)
      total = Number(temp)
    }
  }


  return total
}