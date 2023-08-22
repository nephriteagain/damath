import { ReducerType, action, actionType, data, kingJumpDirection } from "../types/types"

import { randomBool } from "../context/GameContext"

export default function reducer(state: ReducerType, action: action) : ReducerType{ 
    

    if (action.type === actionType.highlightMoves) {
        const pieceToMove = action?.payload?.pieceToMove as data|null
        const boardData = action?.payload?.boardData as data[]
        return {
            ...state,
            pieceToMove,
            boardData
        }
    }
    if (action.type === actionType.setKingJumpDirection) {
        const direction = action?.payload?.kingJumpDirection as kingJumpDirection
        return {
            ...state,
            kingJumpDirection: direction
        }
    }
    if (action.type === actionType.setMultipleCapture) {
        const enableMultiCapture = action?.payload?.multipleCapture as boolean
        return {
            ...state,
            multipleCapture: enableMultiCapture
        }
    }
    if (action.type === actionType.setP1Score) {
        const score = action?.payload?.p1Score as number
        return {
            ...state,
            playerOneScore: score
        }
    }
    if (action.type === actionType.setP2Score) {
        const score = action?.payload?.p2Score as number
        return {
            ...state,
            playerTwoScore: score
        }
    }
    if (action.type === actionType.movePiece) {
        const boardData = action?.payload?.boardData as data[];
        const pieceToMove = action?.payload?.pieceToMove as data|null;
        const forceCapture = action?.payload?.forceCapture as boolean;
        const isFirstMove = action?.payload?.forceCapture as boolean;
        return {
            ...state,
            boardData,
            pieceToMove,
            forceCapture,
            isFirstMove
        }
    }
    if (action.type === actionType.restartGame) {
        return {
            ...state,
            pieceToMove: null,
            playerOneTurn: randomBool(),
            playerChipsCount: {p1: 12, p2: 12},
            gameOver: false,
            multipleCapture: false,
            forceCapture: false,
            kingJumpDirection: kingJumpDirection.null,
            isFirstMove: true,
            timeSup: false,
            playerOneScore: 0,
            playerTwoScore: 0,
        }        
    }
    if (action.type === actionType.resetGame) {
        const timerOne = action?.payload?.timerOne as number;
        const timerTwo = action?.payload?.timerTwo as number;

        return {
            ...state,
            isActive: false,
            currentTimer: 1,
            timerOne,
            timerTwo
        }
    }
    if (action.type === actionType.changeGameMode) {
        const boardData = action?.payload?.boardData as data[];
        return {
            ...state,
            boardData
        }
    }
    if (action.type === actionType.gameOver) {
        return {
            ...state,
            gameOver: true
        }
    }
    if (action.type === actionType.start) {
        return {
            ...state,
            isActive: true
        }
    }
    if (action.type === actionType.nextTurn) {
        const playerOneTurn = action?.payload?.playerOneTurn as boolean
        return {
            ...state,
            playerOneTurn,
            kingJumpDirection : kingJumpDirection.null
        }
    }
    if (action.type === actionType.forceCapture) {
        return {
            ...state,
            forceCapture: true,
        }
    }
    if (action.type === actionType.newBoardData) {
        const boardData = action?.payload?.boardData as data[];
        return {
            ...state,
            boardData
        }
    }
    if (action.type === actionType.setGameMode) {
        return {
            ...state,
            gameMode: ''
        }
    }


    return state
}