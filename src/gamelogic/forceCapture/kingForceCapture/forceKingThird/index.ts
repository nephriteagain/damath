import { data } from "../../../../types/types";
import { forceKingThirdBotLeft } from "./forceKingThirdBotLeft";
import { forceKingThirdTopLeft } from "./forceKingThirdTopLeft";
import { forceKingThirdBotRight } from "./forceKingThirdBotRight";
import { forceKingThirdTopRight } from "./forceKingThirdTopRight";

export default function forceKingCaptureThird(
    item : data,
    index : number,
    boardData : data[],
    jumpIndex : number,
    jumpDirection2nd : string[],
    forceFeed3rd : data[],
    forceFeed2nd : data[],
) {
    forceKingThirdBotLeft(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 7)
    forceKingThirdBotRight(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 9)
    forceKingThirdTopLeft(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -9)
    forceKingThirdTopRight(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -7)
}
