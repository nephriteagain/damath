import { useEffect } from "react"
import { RiAddFill, RiSubtractFill, RiCloseFill, RiDivideFill,  } from 'react-icons/ri'

import { useGlobalContext } from "../context/GameContext"

import '../sass/Board.scss'

// regular chips
import { forceCaptureRegular } from "../gamelogic/forceCapture/forceCapture/forceCaptureFirstJump"
import { foreCaptureSecond } from "../gamelogic/forceCapture/forceCapture/forceCaptureSecond"
import { forceCaptureThird } from "../gamelogic/forceCapture/forceCapture/forceCaptureThird"

// king chips
import { forceKingBotLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondBotLeft"
import { forceKingBotRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondBotRight"
import { forceKingTopLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondTopLeft"
import { forceKingTopRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondTopRight"
import { forceKingThirdBotLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdBotLeft"
import { forceKingThirdBotRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdBotRight"
import { forceKingThirdTopLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdTopLeft"
import { forceKingThirdTopRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdTopRight"

import forceKingCaptureFirst from '../gamelogic/forceCapture/kingForceCapture/forceKingFirst'
import forceKingCaptureSecond from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond"
import forceKingCaptureThird from "../gamelogic/forceCapture/kingForceCapture/forceKingThird"

// gameboard style
import { boardStyling } from "../tsStyle/boardGameStyle"
import { chipStyling } from "../tsStyle/chipStyling"
import { operationStyling } from "../tsStyle/OperationStyling"
import { underLining } from "../tsStyle/chipStyling"
import { cursorPointers } from "../tsStyle/cursorPointers"

import { data } from "../data/counting"

function Board() {

  const { 
    boardData,
    setBoardData, 
    highlightMoves, 
    movePiece, 
    pieceToMove,
    highlightMovesKing, 
    playerOneTurn,
    setPlayerOneTurn,
    multipleCapture,
    setMultipleCapture,
    forceCapture,
    setForceCapture,
    setKingJumpDirection,
    setIsActive,
    isFirstMove,
  } = useGlobalContext()

  function handleStart() {
    setIsActive(true);
  };

  // player turn handler and force capture handler
  useEffect(() => {
    

    if (multipleCapture) {
      setMultipleCapture(false)
      return
    }
    
    if (pieceToMove !== null) return
    if (pieceToMove === null) {
      setPlayerOneTurn(!playerOneTurn)
      setKingJumpDirection(null)
    }
    if (forceCapture) return //this wont rerun again multiple times
    let forceFeed : data[] = []
    let forceFeed2nd : data[] = []
    let forceFeed3rd : data[] = []
    let jumpedArr : data[] = []
    let jumpDirection : string[] = []
    let jumpedArr2nd : data[] = []
    let jumpDirection2nd : string[] = []
    let jumpedArr3rd : data[] = []   

    


    boardData.forEach((item, index) => {
      if (!item.playable) return
      if (item?.piece === null) return
      // regular pawn only
      else if (!item.king) {
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -7)
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -9)
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 9)
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 7)
      
    }
      else if (item.king) {
        forceKingCaptureFirst(item, index, boardData, forceFeed, jumpDirection, jumpedArr)
      }
      
      })


// second jump --------------------------------------------------------------------
    function doubleTake() {
      if (!jumpedArr.length) return
      const arrToJump = jumpedArr.map((item, index) => {
      return {
        ...item,
        piece: forceFeed[index].piece,
        highlighted: false,
        king:  forceFeed[index].king
      }
    })
    const arrToJumpIndices = jumpedArr.map((item, index) => {
      return boardData.indexOf(item)
    })
    
    arrToJump.forEach((itemToMove, index) => {
        const jumpIndex = arrToJumpIndices[index]
          if (!itemToMove.king) {
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, -7)
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, -9)
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, 7)
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, 9)
          }
          
          else if (itemToMove.king) {
            forceKingCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed)
          }
      })
    }
    doubleTake()


    

    if (forceFeed2nd.length) forceFeed = forceFeed2nd
    // -----------------------------------------------------------------------------------

// third jump ---------------------------------------------------------------------------
function tripleTake() {
  if (!forceFeed2nd.length) return
  const arrToJump3rd = jumpedArr2nd.map((item, index) => {
    return {
      ...item,
        piece: forceFeed2nd[index].piece,
        highlighted: false,
        king:  forceFeed2nd[index].king
    }
  })
  const arrToJumpIndices = jumpedArr2nd.map((item, index) => {
      return boardData.indexOf(item)
    })
  
  arrToJump3rd.forEach((item, index) => {
    const jumpIndex = arrToJumpIndices[index]
    if (!item.king) {
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -7)
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -9)
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 7)
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 9)
}
    else if (item.king) {
      forceKingCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd)
    }
  })

}
tripleTake()
if (forceFeed3rd.length) forceFeed = forceFeed3rd

//---------------------------------------------------------------------------------------
    

    if (forceFeed.length) {
      forceFeed = forceFeed.filter((force) => {
      if (playerOneTurn) return force.piece === 'x'
      if (!playerOneTurn) return force.piece === 'z'
    })
    }


    if (forceFeed.length) {
      setForceCapture(true)
      const boardDataCopy = boardData.map((item, index) => {
        if (!item.playable) return item
        if(!item === null) return item
        if (playerOneTurn && item?.piece === 'z') return item
        if (!playerOneTurn && item?.piece === 'x') return item

        else if (forceFeed.indexOf(item) > - 1) {
          return {...item, movable: true}
        }


        return {...item, movable: false}
      })

      setBoardData(boardDataCopy)
    }
  
  }, [pieceToMove])

  return (
    <>
    <div className='board'>
      { boardData.map((item: data, index: number) => {

        const boardStyle  = {}
        boardStyling(item, boardStyle, playerOneTurn)
        
        const chipStyle = {}
        chipStyling(item, chipStyle)

        const operationStyle = {}
        operationStyling(item, operationStyle)
        
        const underline = {}
        underLining(item, underline)
      // cursor pointers
        cursorPointers(playerOneTurn, item, chipStyle)

        return ( 
          <div className='square'
            key={index}
            style={boardStyle}
            onClick={
              () => {
                if (!item.highlighted) return
                isFirstMove && handleStart()
                movePiece(pieceToMove as data, item, index)
                
              }
            }
          >
          <div className="operation" style={operationStyle}>
            <span className="operation-span" >
              {item?.operation === 'add' && <RiAddFill />}
              {item?.operation === 'subtract' && <RiSubtractFill />}
              {item?.operation === 'multiply' && <RiCloseFill />}
              {item?.operation === 'divide' && <RiDivideFill />}          
            </span>
          </div>

          {item.piece !== null && 
          <div className="piece"
            draggable='true'
            style={chipStyle}
            onClick={() => {
              if (!item.movable) return
              item.king === false ?
              highlightMoves(item, index, playerOneTurn, boardData) : // for normal piece
              highlightMovesKing(item, index, playerOneTurn, boardData) // for king piece
            }}
          >
            <span style={underline}
              className={item?.piece === 'z'?'player-one-piece': 'player-two-piece'}
            >{item?.value}
            </span>
          </div>}
        </div> )
      }) }
    </div>
    </>
  )
}

export default Board