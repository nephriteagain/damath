import { data } from "../../types/types";

import { kingBotLeftMulti } from "./kingMultiJumpBotLeft";
import { kingBotRightMulti } from "./kingMultiJumpBotRight";
import { kingTopRightMulti } from "./kingMultiJumpTopRight";
import { kingTopLeftMulti } from "./kingMultiJumpTopLeft";

export default function kingMultiJumpSearcher(
    itemToMove: data,
    index: number,
    jumpDirection: string[],
    board: data[],
    jumpIndex: number,
    doubleTakeArr: data[],
    tempArrForJumps: data[],
    jumpDirection2nd?: string[],
    doubleTakeLanding?: data[],
) {
    kingBotLeftMulti(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, 7, jumpDirection2nd, doubleTakeLanding)
    kingBotRightMulti(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, 9, jumpDirection2nd, doubleTakeLanding)    
    kingTopRightMulti(itemToMove, index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, -7, jumpDirection2nd, doubleTakeLanding)
    kingTopLeftMulti(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, -9, jumpDirection2nd, doubleTakeLanding)
}