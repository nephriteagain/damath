export function solve(chipToBeTaken, pieceToMove, placeToLand) {
      if (!chipToBeTaken?.piece) return
      let total = 0
      const capturedValue : number= chipToBeTaken.value
      const moveValue : number = pieceToMove.value
      const operation : string = placeToLand.operation

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
      let slice = total.toString().slice(index).length
      if (slice > 3) {
        const twoDeci = total.toFixed(2)
        total = Number(twoDeci)
      }
      return total
    }