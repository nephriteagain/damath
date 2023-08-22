import { useContext, createContext, useState, useEffect, ReactNode, useReducer } from "react"
import { compileString } from "sass"

import { POSSIBLEJUMPS } from "../data/possibleJumps"

import { INTEGER } from "../data/integer"
import { COUNTING } from "../data/counting"
import { WHOLE } from "../data/whole"

// regular chips logic
import { checkForMovesPlayerOne, checkForMovesPlayerTwo, checkForMovesOrJumpsPlayerOne, checkForMovesOrJumpsPlayerTwo } from '../gamelogic/moveSearcher/moveChecker'
import { checkForJumps } from "../gamelogic/moveSearcher/jumpChecker"
import { checkForMultiJumps } from "../gamelogic/moveSearcher/multiJumpChecker"
import { regularCapture } from "../gamelogic/additionalCapture/capture/regularCapture"

// king logic
import kingMoveSearcher from "../gamelogic/kingMoveSearcher"
import kingMultiJumpSearcher from "../gamelogic/kingMultiJumpSearcher"
import kingCapture from "../gamelogic/additionalCapture/kingCapture"

// solving logic
import { solve } from "../gamelogic/formula/solve"

import { ReducerType, data, GameContextProps } from "../types/types"

import reducer from "../reducer/reducer"



function randomBool() {
  return Math.random() < 0.5;
}

const GlobalContext = createContext<GameContextProps>({} as GameContextProps)

interface GlobalProviderProps {
  children: ReactNode
}


const timeLimit = 6000
const initial : ReducerType = {
  gameMode: 'INTEGER', boardData: INTEGER, pieceToMove: null, playerOneTurn: randomBool(), playerChipsCount: {p1: 12, p2: 12},
  gameOver: false, multipleCapture: false, forceCapture: false, kingJumpDirection: null, timeLimit: timeLimit, timerOne: timeLimit,
  timerTwo: timeLimit, isActive: false, currentTimer: 2, isFirstMove: true,
  timeSup: false, playerOneScore: 0, playerTwoScore: 0
}


export const GlobalProvider = ({children}: GlobalProviderProps) => {
  const [
    {
      gameMode, boardData, pieceToMove, playerOneTurn, playerChipsCount, gameOver, multipleCapture, forceCapture,
      kingJumpDirection, timeLimit, timerOne, timerTwo, isActive, currentTimer, isFirstMove, timeSup, playerOneScore, playerTwoScore
    },
    dispatch
  ] = useReducer(reducer, initial)

  // const [ gameMode, setGameMode ] = useState<gameMode>('INTEGER')
  // const [ boardData, setBoardData ] = useState<data[]>(INTEGER)
  // const [ pieceToMove, setPieceToMove ] = useState<data|null>(null)
  // const [ playerOneTurn, setPlayerOneTurn ] = useState<boolean>(randomBool()) // player one will still be first to move regardless
  // const [ playerChipsCount, setPlayerChipsCount ] = useState<{p1: number, p2: number}>({p1: 12, p2: 12})
  // const [ gameOver, setGameOver ] = useState<boolean>(false)
  // const [multipleCapture, setMultipleCapture] = useState<boolean>(false)
  // const [forceCapture, setForceCapture] = useState<boolean>(false)
  // const [ kingJumpDirection, setKingJumpDirection ] = useState<kingJumpDirection>(null)
  // const [ timeLimit, setTimeLimit ] = useState<number>(6000)
  // const [timerOne, setTimerOne] = useState<number>(timeLimit);
  // const [timerTwo, setTimerTwo] = useState<number>(timeLimit);
  // const [isActive, setIsActive] = useState<boolean>(false);
  // const [currentTimer, setCurrentTimer] = useState<number>(2);
  // const [ isFirstMove, setIsFirstMove ] = useState<boolean>(true)
  // const [ timeSup, setTimesUp ] = useState<boolean>(false)
  // const [ playerOneScore, setPlayerOneScore ] = useState<number>(0)
  // const [ playerTwoScore, setPlayerTwoScore ] = useState<number>(0)


  function highlightMoves(itemToMove: data, position: number, playerTurn: boolean, board: data[]) {
    const { x: xPosition, y: yPosition, piece, selected } = itemToMove;
    let tempArrForMoves : data[] = [] // stores non capturing moves
    let tempArrForJumps : data[] = [] // stores capturing moves
    let tempArrForJumps2 : data[] = []                                         
    let jumpDirection : string[] = [] // stores direction of jumps
    const doubleTakeArr : data[] = [] // stores jumps from double captures
    let tripleTakeArr : data[] = []
    const jumpDirection2nd : string[] = [] // stores direction jumps from double captures
    
    if (piece === null) return
    if (itemToMove.king) return
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
    if (playerTurn === true && piece === 'x' || !playerTurn && piece === 'z') return
    // console.log(position)   

    if (!itemToMove.king) {
      // p1 right move
      checkForMovesPlayerOne(itemToMove, position, board, tempArrForMoves, -7)
      // p1 left move
      checkForMovesPlayerOne(itemToMove, position, board, tempArrForMoves, -9)
      // p2 left move
      checkForMovesPlayerTwo(itemToMove, position, board, tempArrForMoves, 7)
      // p2 right move
      checkForMovesPlayerTwo(itemToMove, position, board, tempArrForMoves, 9)

      // top right jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, -7, jumpDirection)
      // top left jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, -9, jumpDirection)
      // bot left jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, 7, jumpDirection)
      // bot right jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, 9, jumpDirection)

    }
//--------this area check if there is a double take opportunity
    
    function doubleTake() {
      if (!tempArrForJumps.length) return

      const arrToJump = tempArrForJumps.map(item => {
        return {
          ...item,
          piece: itemToMove.piece,
          highlighted: false,
          king: itemToMove.king
        }
        
      })
      // transformed jumped arr indices
      const  arrToJumpIndices = tempArrForJumps.map(item => {
        return boardData.indexOf(item)
      })
      // total number of jumps

      
      arrToJump.forEach((itemToMove, index) => {
        if (!itemToMove.king) {
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  -7, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  -9, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  7, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  9, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)

        }
      })
    }
    doubleTake()
    
    // ----------------------------------------------------------------------------------
    
    // tripleTake------------------------------------------
    function tripleTake() {
      if (!doubleTakeArr.length) return
      const jumpIndices = tempArrForJumps2.map((item, index) => {
        return board.indexOf(item)
      })
      const arrToJump = tempArrForJumps2.map((item, index) => {
        return {
          ...item,
          piece: itemToMove.piece,
          king: itemToMove.king,
          highlighted: false,
        }
      })

    arrToJump.forEach((item, index) => {
      if (!itemToMove.king) {
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, -7, tempArrForJumps)
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, -9, tempArrForJumps)
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, 7, tempArrForJumps)
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, 9, tempArrForJumps)
      }
    })

    tripleTakeArr = tripleTakeArr.filter((item) => {
      return item !== undefined
    })
    }

    tripleTake()
//-----------------------------------------------------
if (doubleTakeArr.length) tempArrForJumps = doubleTakeArr
if (tripleTakeArr.length) tempArrForJumps = tripleTakeArr

    const boardCopy = board.map((item, index) => {
      if (!item.playable) return item
      else if (position === index) {
          return {...item, selected: true}
        }
      if (tempArrForJumps.length) {
        if (tempArrForJumps.indexOf(item) > -1) {
          return {...item, highlighted: true, selected: false}
        }
      }
      else if (tempArrForMoves.indexOf(item) > -1) {
        return {...item, highlighted: true, selected: false}
      }
      return {...item, highlighted: false, selected: false}
    })


  


  
  setPieceToMove({...itemToMove})
  // setPossibleMoves([...tempArrForMoves])
  setBoardData([...boardCopy])
  }

  function highlightMovesKing(itemToMove: data, position: number, playerTurn: boolean, board: data[]) {
    const { x: xPosition, y: yPosition, piece,  } = itemToMove;
    let tempArrForMoves : data[] = []
    let tempArrForJumps : data[] = []
    let jumpDirection : string[] = []
    
    let doubleTakeArr : data[] = []
    let tripleTakeArr : data[] = []
    let jumpDirection2nd : string[] = []
    let doubleTakeLanding : data[] = []

    if (piece === null) return
    if (!itemToMove.king) return
    // if p1 try to access p2 ch0ips it will immediately return and vice versa for player 2
    if (playerTurn === true && piece === 'x' || !playerTurn && piece === 'z') return
    
    if (itemToMove.king) {
      // searches initial possible moves
      kingMoveSearcher(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection)
    }
    


// ----- double take checker -------- ------------------
function doubleTake() {
  if (!tempArrForJumps.length) return

  const arrToJump = tempArrForJumps.map(item => {
    return {
      ...item,
      piece: itemToMove.piece,
      highlighted: false,
      king: itemToMove.king
    }
  })
  const arrToJumpIndices = tempArrForJumps.map(item => {
        return boardData.indexOf(item)
      })

  arrToJump.forEach((itemToMove, index) => {
    const jumpIndex = arrToJumpIndices[index]
  
    kingMultiJumpSearcher(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, jumpDirection2nd, doubleTakeLanding)
  })

}

doubleTake()

// ----------------------------------------------------
// triple take checker
if (doubleTakeArr.length) tempArrForJumps = doubleTakeArr

function tripleTake() {
  if (!doubleTakeArr.length) return
  const jumpIndices = doubleTakeLanding.map((item, index) => {
    return board.indexOf(item)
  })
  const arrToJump = doubleTakeLanding.map((item, index) => {
        return {
          ...item,
          piece: itemToMove.piece,
          king: itemToMove.king,
          highlighted: false,

        }
      })
  
  arrToJump.forEach((item, index) => {
    const jumpIndex = jumpIndices[index]
    if (itemToMove.king) {
      kingMultiJumpSearcher(itemToMove, index, jumpDirection2nd, board, jumpIndex, tripleTakeArr, tempArrForJumps,)
    }
  })


}
tripleTake()
// ----------------------------------------------------
  if (tripleTakeArr.length) {
    tempArrForJumps = tripleTakeArr
  }
    
    const tempboard = board.map((item, index) => {
      if (!item.playable) return item

      else if (position === index) {
        return {...item, selected: true}
      }

      if (tempArrForJumps.length) {
        if (tempArrForJumps.indexOf(item) > -1) {
          return {...item, highlighted: true, selected: false}
        }
      }
      else if (tempArrForMoves.indexOf(item) > -1) {
        return {...item, highlighted: true, selected: false}
      }

      return {...item, highlighted: false, selected: false}
    })


    // setPossibleMoves([...tempArrForMoves])
    setBoardData([...tempboard])
    setPieceToMove({...itemToMove})

  }



  function movePiece(pieceToMove: data, placeToLand: data, index: number) {
    let movingPiece = pieceToMove
    let chipToBeTaken : data = {}
    let multipleJumpSearcher : data = {}
    let jumpSearcherIndex = -1000
    let jumped = false
    let jumpDirection: (null|string) = kingJumpDirection

    // find the selected chip
    const chipToMove = boardData.find((item) => {
      if (item.x === movingPiece.x && item.y === movingPiece.y) {
        return item
      }
    })

    let newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item
      const indexStart = boardData.indexOf(chipToMove as data)
      const indexLand = boardData.indexOf(placeToLand)

    

      if (item === chipToMove) {
        return {...item, piece: null, selected: true, king:false, value: null}
      }

      if (
        item.x === placeToLand.x && item.y ===  placeToLand.y) {
        multipleJumpSearcher = {
          ...item,
          piece: movingPiece.piece,
          highlighted: false, 
          king: movingPiece.king, 
          selected: true,
          value: movingPiece.value
        }
        jumpSearcherIndex = index

        return multipleJumpSearcher
      }
      
      // removes captured
      POSSIBLEJUMPS.forEach((possibleMoves) => {
        if (
          possibleMoves.indexOf(index) !== -1 &&
          possibleMoves.indexOf(indexStart) !== -1 &&
          possibleMoves.indexOf(indexLand) !== -1 &&
          indexLand !== index &&
          item?.piece !== null &&
          (index > indexStart && index < indexLand || 
            index < indexStart && index > indexLand)
        ) {
            chipToBeTaken = item
            const indexEat = boardData.indexOf(item)
            if
            (
              indexLand > indexEat &&
              indexLand === indexEat + 7 ||
              indexLand === indexEat + 14 ||
              indexLand === indexEat + 21 ||
              indexLand === indexEat + 28 ||
              indexLand === indexEat + 35 ||
              indexLand === indexEat + 42 
            ) {
              setKingJumpDirection('bot left')
              jumpDirection = 'bot left'
            }
            else if
            (
              indexLand < indexEat &&
              indexLand === indexEat - 7 ||
              indexLand === indexEat - 14 ||
              indexLand === indexEat - 21 ||
              indexLand === indexEat - 28 ||
              indexLand === indexEat - 35 ||
              indexLand === indexEat - 42 
            ) {
              setKingJumpDirection('top right')
              jumpDirection = 'top right'

            } 
            else if
            (
              indexLand > indexEat &&
              indexLand === indexEat + 9 ||
              indexLand === indexEat + 18 ||
              indexLand === indexEat + 27 ||
              indexLand === indexEat + 36 ||
              indexLand === indexEat + 45 ||
              indexLand === indexEat + 54 || 
              indexLand === indexEat + 63  
            ) {
              setKingJumpDirection('bot right')
              jumpDirection = 'bot right'

            }
            else if
            (
              indexLand < indexEat &&
              indexLand === indexEat - 9 ||
              indexLand === indexEat - 18 ||
              indexLand === indexEat - 27 ||
              indexLand === indexEat - 36 ||
              indexLand === indexEat - 45 ||
              indexLand === indexEat - 54 || 
              indexLand === indexEat - 63  
            ) {
              setKingJumpDirection('top left')
              jumpDirection = 'top left'
            }
              
          
        }
        
      })

    
      
      return {...item, highlighted: false, selected: false,}

    })

    
  
    newBoardData =  newBoardData.map((item, index) => {
      const capturedIndex = boardData.indexOf(chipToBeTaken)
      if (index === capturedIndex) {
        console.log('captured', item)
        jumped = true
        return {
          ...item, 
          piece: null, 
          king: false,
          selected: false, 
          highlighted: false,
          movable: true,
          value: null
        }
      }
      


        return {...item, movable: true}
      
    })
    // setBoardData([...newArr])
    
    let forceFeed : data[] = []
    function eatMoreChips(pieceToJump: data, index: number, board: data[], pieceJumped: boolean, kingJumpDirection: string|null) {
      if (!pieceJumped) return // only when a piece do a capture that this will run
      forceFeed = []
      if (!pieceToJump.king) {
          regularCapture(pieceToJump, index, board, forceFeed, -7)
          regularCapture(pieceToJump, index, board, forceFeed, -9)
          regularCapture(pieceToJump, index, board, forceFeed, 7)
          regularCapture(pieceToJump, index, board, forceFeed, 9)
        }

      if (pieceToJump.king) {
        // top right
        kingCapture(pieceToJump, index, board, kingJumpDirection, forceFeed)
      }

      if (forceFeed.length) {
        // console.log(forceFeed, 'you must eat this again')
        movingPiece = pieceToJump
        setMultipleCapture(true)
        forceFeed = forceFeed.filter((force) => {
      if (playerOneTurn) return force.piece === 'z'
      if (!playerOneTurn) return force.piece === 'x'
    })

      newBoardData = board.map((item, sameIndex) => {
          if (!item.playable) return item
          if (!item === null) return item
          if (playerOneTurn && item?.piece === 'x') return item
          if (!playerOneTurn && item?.piece === 'z') return item
          else if (sameIndex === index) {
          // console.log('matched')
          return {...item, movable: true}
        }


        return {...item, movable: false}
        })
      
      }
    }
    

    eatMoreChips(multipleJumpSearcher, jumpSearcherIndex, newBoardData, jumped, jumpDirection)


    function kingPromotionChecker() {
      if (forceFeed.length) return
      newBoardData = newBoardData.map((item: data) => {
        if (!item.playable) return item

        else if (item.piece === 'z' && !item.king && item.y === 7) {
          console.log('player 1 king awakened')
          return {...item, king: true}
        }
        
        else if (item.piece === 'x' && !item.king && item.y === 0) {
          console.log('player 2 king awakened')
          return {...item, king: true}
        }
        return item
      })
    }

    kingPromotionChecker()
    
    if (chipToBeTaken?.piece) {
      if (playerOneTurn) {
        const score = solve(chipToBeTaken, pieceToMove, placeToLand) as number
        setPlayerOneScore(playerOneScore + score)
      }
      if (!playerOneTurn) {
        const score = solve(chipToBeTaken, pieceToMove, placeToLand) as number
        setPlayerTwoScore(playerTwoScore + score)
      }
    }

    // console.log(total, 'total')
    setBoardData([...newBoardData])
  
    

    // if no additional piece to be take this will end the turn of the player
    
    setPieceToMove(null)
    // setPlayerOneTurn(!playerOneTurn)
    setForceCapture(false)
    setIsFirstMove(false)
  }

  function handleRestart() {
    
    if (gameMode === 'INTEGER') setBoardData(INTEGER)
    else if (gameMode === 'WHOLE') setBoardData(WHOLE)
    else if (gameMode === 'COUNTING') setBoardData(COUNTING)

    setPieceToMove(null)
    // setPossibleMoves([])
    setPlayerOneTurn(randomBool())
    setPlayerChipsCount({p1: 12, p2: 12})
    setGameOver(false)
    // setJumpedChip(null)
    setMultipleCapture(false)
    setForceCapture(false)
    setKingJumpDirection(null)
    setIsFirstMove(true)
    setTimesUp(false)
    setPlayerOneScore(0)
    setPlayerTwoScore(0)
    handleReset()
  }

  function handleReset() {
    setIsActive(false);
    setTimerOne(timeLimit);
    setTimerTwo(timeLimit);
    setCurrentTimer(1);
  };


  // player chips counter
  useEffect(() => {
    let playerMoveArr : data[] = []
    let tempArr : data[] = [] // only place to reuse a function
    let jumpDirection : string[] = [] // only place to reuse a function

    boardData.forEach((item, index) => {
      if (!item?.playable) return // black squares
      if (item?.piece === null) return // empty white squares

      if (!item.king) {
        if (playerOneTurn) {
          checkForMovesOrJumpsPlayerOne(item, index, boardData, playerMoveArr, -7)
          checkForMovesOrJumpsPlayerOne(item, index, boardData, playerMoveArr, -9)

        } else {
          checkForMovesOrJumpsPlayerTwo(item, index, boardData, playerMoveArr, 7)
          checkForMovesOrJumpsPlayerTwo(item, index, boardData, playerMoveArr, 9)

        }
        

      }
      if (item.king) {
        if (playerOneTurn && item?.piece ==='x') return
        if (!playerOneTurn && item?.piece === 'z') return
        kingMoveSearcher(item, index, kingJumpDirection, boardData, tempArr, tempArr, jumpDirection)
      }
      
    })
    
    tempArr.forEach(item => {
      playerMoveArr.push(item)
    })


    // if a player has no moves left the game is over
    if (!playerMoveArr.length) {
      setGameOver(true)
    }
  }, [playerOneTurn])

  // game mode handler
  useEffect(() => {
    if (gameMode === 'INTEGER') {
      setBoardData(INTEGER)
    }
    else if (gameMode === 'WHOLE') {
      setBoardData(WHOLE)
    }
    else if (gameMode === 'COUNTING') {
      setBoardData(COUNTING)
    }
  }, [gameMode])


  return (
    <GlobalContext.Provider value={{      
    boardData,
    pieceToMove,
    playerOneTurn,
    playerChipsCount,
    gameOver,
    multipleCapture,
    forceCapture,
    kingJumpDirection,
    timeLimit,
    timerOne,
    timerTwo,
    isActive,
    currentTimer,
    isFirstMove,
    timeSup,
    playerOneScore,
    playerTwoScore,
    highlightMoves,
    highlightMovesKing,
    movePiece,
    handleRestart,
    handleReset,
    dispatch,
    } as GameContextProps}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
