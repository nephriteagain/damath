import { INTEGER } from "./integer"
import { randomBool } from "../context/GameContext"
import { ReducerType, kingJumpDirection as kingDirection } from "../types/types"

export const timeLimit = 6000
export const initial : ReducerType = {
  gameMode: 'INTEGER', 
  boardData: INTEGER, 
  pieceToMove: null, 
  playerOneTurn: randomBool(), 
  playerChipsCount: {p1: 12, p2: 12},
  gameOver: false, 
  multipleCapture: false, 
  forceCapture: false, 
  kingJumpDirection: kingDirection.null, 
  timeLimit: timeLimit, 
  timerOne: timeLimit,
  timerTwo: timeLimit, 
  isActive: false, 
  currentTimer: 2, 
  isFirstMove: true,  
  timeSup: false, 
  playerOneScore: 0, 
  playerTwoScore: 0
}