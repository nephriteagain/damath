import { data } from "../../data/counting";

import { kingBotLeft } from "./kingBotLeft";
import { kingBotRight } from "./kingBotRight";
import { kingTopLeft } from "./kingTopLeft";
import { kingTopRight } from "./kingTopRight";

export default function kingMoveSearcher(
    itemToMove: data,
    position: number,
    kingJumpDirection: string|null,
    board: data[],
    tempArrForMoves: data[],
    tempArrForJumps: data[],
    jumpDirection: string[],
) {
    kingBotLeft(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, 7)
    kingBotRight(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, 9)
    kingTopRight(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, -7)
    kingTopLeft(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, -9)
}