import { data } from "../../../data/counting";

import { forceCaptureRegular } from "./forceCaptureFirstJump";
import { foreCaptureSecond } from "./forceCaptureSecond";
import { forceCaptureThird } from "./forceCaptureThird";

export function forceCaptureFirstAll(
    item : data,
    index : number,
    boardData : data[],
    forceFeed : data[],
    jumpDirection : string[],
    jumpedArr : data[],
) {
    forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -7)
    forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -9)
    forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 9)
    forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 7)
}

export function forceCaptureSecondAll(
    itemToMove : data,
    index : number,
    boardData : data[],
    jumpIndex : number,
    jumpDirection2nd : string[],
    forceFeed2nd : data[],
    jumpDirection : string[],
    jumpedArr2nd : data[],
    forceFeed : data[],
) {
    foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, -7)
    foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, -9)
    foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, 7)
    foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, 9)
}

export function forceCaptureThirdAll(
    item : data,
    index : number,
    boardData : data[],
    jumpIndex : number,
    jumpDirection2nd : string[],
    forceFeed3rd : data[],
    forceFeed2nd : data[],
) {
    forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -7)
    forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -9)
    forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 7)
    forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 9)
}