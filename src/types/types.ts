import { Dispatch } from 'react'

type gameMode = ('INTEGER'|'COUNTING'|'WHOLE'|'')

type kingJumpDirection = (null|'bot left'|'bot right'|'top left'|'top right')

export type piece = ('x'|'z'|null)
export type operation = ('add'|'subtract'|'multiply'|'divide')

export type playerChipsCount = {p1: number, p2: number}

export interface data {
    x?: number
    y?: number
    piece?: piece
    value?: (number|null)
    playable?: boolean
    highlighted?: boolean
    king?: boolean
    selected?: boolean
    movable?: boolean
    operation?: operation
  }

export interface ReducerType {
    gameMode: gameMode;
    boardData: data[];
    pieceToMove: data[]|null;
    playerOneTurn: boolean;
    playerChipsCount: playerChipsCount;
    gameOver: boolean;
    multipleCapture: boolean;
    forceCapture: boolean;
    kingJumpDirection: kingJumpDirection;
    timeLimit: number;
    timerOne: number;
    timerTwo: number;
    isActive: boolean;
    currentTimer: number;
    isFirstMove: boolean;
    timeSup: boolean;
    playerOneScore: number;
    playerTwoScore: number;
}

export interface action {
    type: string //TODO:
    payload: Record<string,any> //TODO:
}


export interface GameContextProps {
  gameMode: gameMode;
    boardData: data[];
    pieceToMove: data[]|null;
    playerOneTurn: boolean;
    playerChipsCount: playerChipsCount;
    gameOver: boolean;
    multipleCapture: boolean;
    forceCapture: boolean;
    kingJumpDirection: kingJumpDirection;
    timeLimit: number;
    timerOne: number;
    timerTwo: number;
    isActive: boolean;
    currentTimer: number;
    isFirstMove: boolean;
    timeSup: boolean;
    playerOneScore: number;
    playerTwoScore: number;
    highlightMoves: (itemToMove: data, position: number, playerTurn: boolean, board: data[]) => void;
    highlightMovesKing: (itemToMove: data, position: number, playerTurn: boolean, board: data[]) => void;
    movePiece: (pieceToMove: data, placeToLand: data, index: number) => void;
    handleRestart: () => void;
    handleReset: () => void;
    dispatch: Dispatch<action>
  }