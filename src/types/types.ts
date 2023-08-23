import { Dispatch } from 'react'

export type gameMode = ('INTEGER'|'COUNTING'|'WHOLE'|'')

export enum kingJumpDirection {
  null,
  botLeft = 'bot left',
  botRight = 'bot right',
  topLeft = 'top left',
  topRight = 'top right'
}

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
    pieceToMove: data|null;
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
    type: actionType
    payload?: payload
}

export enum actionType {
  highlightMoves = 'highlight_moves',
  setKingJumpDirection = 'set_king_jump_direction',
  setMultipleCapture = 'set_multiple_capture',
  setP1Score = 'set_p1_score',
  setP2Score = 'set_p2_score',
  movePiece = 'move_piece',
  restartGame = 'restart_game',
  resetGame = 'reset_game',
  // this change the board data
  changeGameMode = 'change_game_mode',
  // this changes the mode
  setGameMode = 'set_game_mode',
  gameOver = 'game_over',
  start = 'start',
  nextTurn = 'next_turn',
  forceCapture = 'force_capture',
  newBoardData = 'new_board_data',
  changeCurrentTime = 'change_current_timer',
  timesUp = 'times_up',
  setTimerOne = 'set_timer_one',
  setTimerTwo = 'set_timer_two',
  setTimeLimit = 'set_time_limit'
}

export interface payload {
  pieceToMove?: data|null;
  boardData?: data[];
  kingJumpDirection?: kingJumpDirection;
  multipleCapture?: boolean;
  forceCapture?: boolean;
  isFirstMove?: boolean;
  playerOneTurn?: boolean;
  setPlayerChipsCount?: playerChipsCount;
  gameOver?: boolean;
  timesUp?: boolean;
  p1Score?: number;
  p2Score?: number;
  isActive?: boolean;
  timerOne?: number;
  timerTwo?: number;
  currentTimer?: number;
  timeLimit?: number;
  gameMode?: gameMode
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