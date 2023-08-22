import { data } from "../../../data/counting";
import { kingTopLeftCapture } from "./topLeftKingCapture";
import { kingTopRightCapture } from "./topRightKingCapture";
import { kingBotLeftCapture } from "./botLeftKingCapture";
import { kingBotRightCapture } from "./botRightKingCapture";

export default function kingCapture(
    pieceToJump : data,
    index : number,
    board : data[],
    kingJumpDirection : string|null,
    forceFeed : data[],
) {
    kingTopLeftCapture(pieceToJump, index, board, kingJumpDirection, forceFeed, -9)
    kingTopRightCapture(pieceToJump, index, board, kingJumpDirection, forceFeed, -7)
    kingBotLeftCapture(pieceToJump, index, board, kingJumpDirection, forceFeed, 7)
    kingBotRightCapture(pieceToJump, index, board, kingJumpDirection, forceFeed, 9)
}