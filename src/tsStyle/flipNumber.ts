export function flipNumber(playerPiece: string) {
    if (playerPiece === 'player-one-piece') {
      const playerOnePieces = document.querySelectorAll('.player-one-piece')
      playerOnePieces.forEach((piece: any) => {
        const pieceStyle = window.getComputedStyle(piece)
        const rotate = pieceStyle.transform
        if (rotate === 'matrix(-1, 0, 0, -1, 0, 0)') {
          piece.style.transform = 'rotate(0deg)'
        } else {
          piece.style.transform = 'rotate(180deg)'
        }
      })
    }
    else if (playerPiece === 'player-two-piece') {
      const playerTwoPieces = document.querySelectorAll('.player-two-piece')
      playerTwoPieces.forEach((piece: any) => {
        const pieceStyle = window.getComputedStyle(piece)
        const rotate = pieceStyle.transform
        if (rotate === 'matrix(-1, 0, 0, -1, 0, 0)') {
          piece.style.transform = 'rotate(0deg)'
        } else {
          piece.style.transform = 'rotate(180deg)'
        }
      })
    }
  }