import { data } from "../../../../types/types";
import { forceKingBotLeft } from "./forceKingSecondBotLeft";
import { forceKingTopLeft } from "./forceKingSecondTopLeft";
import { forceKingBotRight } from "./forceKingSecondBotRight";
import { forceKingTopRight } from "./forceKingSecondTopRight";

export default function forceKingCaptureSecond(
    itemToMove : data,
    index : number,
    boardData : data[],
    jumpIndex : number,
    jumpDirection : string[],
    jumpedArr2nd : data[],
    jumpDirection2nd : string[],
    forceFeed2nd : data[],
    forceFeed : data[],
) {
    forceKingBotLeft(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, 7)
    forceKingBotRight(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, 9)
    forceKingTopLeft(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, -9)
    forceKingTopRight(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, -7)
}