import { data } from "../../../../data/counting";

import { forceKingCapture } from "./forceKingFirst";

export default function forceKingCaptureFirst(
    item : data,
    index : number,
    boardData : data[],
    forceFeed : data[],
    jumpDirection : string[],
    jumpedArr : data[],
) {
    forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -7)
    forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -9)
    forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 7)
    forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 9)
}