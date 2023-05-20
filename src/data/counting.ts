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

export type piece = ('x'|'z'|null)
export type operation = ('add'|'subtract'|'multiply'|'divide')

export const COUNTING : data[] = [
  {x: 0, y: 7, piece: 'x', value: 3,  playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'multiply'},
  {x: 1, y: 7, piece: null, playable: false, highlighted: false},

  {x: 2, y: 7, piece: 'x', value: 6, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'divide'},
  {x: 3, y: 7, piece: null, playable: false, highlighted: false},

  {x: 4, y: 7, piece: 'x', value: 9, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'subtract'},
  {x: 5, y: 7 , piece: null, playable: false, highlighted: false},

  {x: 6, y: 7, piece: 'x', value: 12, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'add'},
  {x: 7, y: 7, piece: null, playable: false, highlighted: false},

  {x: 0, y: 6, piece: null, playable: false, highlighted: false},
  {x: 1, y: 6, piece: 'x', value: 8, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'divide'},

  {x: 2, y: 6, piece: null, playable: false, highlighted: false},
  {x: 3, y: 6, piece: 'x',  value: 11, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'multiply'},
  
  {x: 4, y: 6, piece: null, playable: false, highlighted: false},
  {x: 5, y: 6, piece: 'x', value: 4, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'add'},

  {x: 6, y: 6, piece: null, playable: false, highlighted: false},
  {x: 7, y: 6, piece: 'x', value: 1, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'subtract'},

  {x: 0, y: 5, piece: 'x', value: 5,  playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'subtract'},
  {x: 1, y: 5, piece: null, playable: false, highlighted: false},

  {x: 2, y: 5, piece: 'x', value: 2, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'add'},
  {x: 3, y: 5, piece: null, playable: false, highlighted: false},

  {x: 4, y: 5, piece: 'x', value: 7, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'multiply'},
  {x: 5, y: 5, piece: null, playable: false, highlighted: false},

  {x: 6, y: 5, piece: 'x', value: 10, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'divide'},
  {x: 7, y: 5, piece: null, playable: false, highlighted: false},

  {x: 0, y: 4, piece: null, playable: false, highlighted: false},
  {x: 1, y: 4, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'add'},

  {x: 2, y: 4, piece: null, playable: false, highlighted: false},
  {x: 3, y: 4, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'subtract'},

  {x: 4, y: 4, piece: null, playable: false, highlighted: false},
  {x: 5, y: 4, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'divide'},

  {x: 6, y: 4, piece: null, playable: false, highlighted: false},
  {x: 7, y: 4, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'multiply'},

  {x: 0, y: 3, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'multiply'},
  {x: 1, y: 3, piece: null, playable: false, highlighted: false},

  {x: 2, y: 3, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'divide'},
  {x: 3, y: 3, piece: null, playable: false, highlighted: false},

  {x: 4, y: 3, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'subtract'},
  {x: 5, y: 3, piece: null, playable: false, highlighted: false},

  {x: 6, y: 3, piece: null, value: null, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'add'},
  {x: 7, y: 3, piece: null, playable: false, highlighted: false},

  {x: 0, y: 2, piece: null, playable: false, highlighted: false},
  {x: 1, y: 2, piece: 'z', value: 10, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'divide'},

  {x: 2, y: 2, piece: null, playable: false, highlighted: false},
  {x: 3, y: 2, piece: 'z', value: 7, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'multiply'},

  {x: 4, y: 2, piece: null, playable: false, highlighted: false},
  {x: 5, y: 2, piece: 'z', value: 2,  playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'add'},

  {x: 6, y: 2, piece: null, playable: false, highlighted: false},
  {x: 7, y: 2, piece: 'z', value: 5, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'subtract'},

  {x: 0, y: 1, piece: 'z', value: 1, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'subtract'},
  {x: 1, y: 1, piece: null, playable: false, highlighted: false},

  {x: 2, y: 1, piece: 'z', value: 4, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'add'},
  {x: 3, y: 1, piece: null, playable: false, highlighted: false},

  {x: 4, y: 1, piece: 'z', value: 11, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'multiply'},
  {x: 5, y: 1, piece: null, playable: false, highlighted: false},

  {x: 6, y: 1, piece: 'z', value: 8, playable: true, highlighted: false, king: false , selected: false, movable: true, operation: 'divide'},
  {x: 7, y: 1, piece: null, playable: false, highlighted: false},

  {x: 0, y: 0, piece: null, playable: false, highlighted: false},
  {x: 1, y: 0, piece: 'z', value: 12, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'add'},

  {x: 2, y: 0, piece: null, playable: false, highlighted: false},
  {x: 3, y: 0, piece: 'z', value: 9, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'subtract'},

  {x: 4, y: 0, piece: null, playable: false, highlighted: false},
  {x: 5, y: 0, piece: 'z', value: 6, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'divide'},

  {x: 6, y: 0, piece: null, playable: false, highlighted: false},
  {x: 7, y: 0, piece: 'z', value: 3, playable: true, highlighted: false, king: false  , selected: false, movable: true, operation: 'multiply'},
]