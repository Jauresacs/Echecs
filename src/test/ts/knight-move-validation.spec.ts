import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';

let chessboard: Chessboard;

export class TestKnightMoves {
    @Setup
    beforeEach() {
        // TODO:
        // Initialize an empty chessboard
        chessboard=createEmptyChessboard();
        // Place a white Knight on E4
        putPiece(chessboard, positions.E4, pieces.whiteKnight)
    }

    @Test('A Knight can move two squares horizontally and one square vertically')
    testCanMoveThreeHorizontalAndOneVertical() {
        // TODO:
        // Check the following moves are possible:
        // - moveE4_G3
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.G3 })).toBeTruthy()
        // - moveE4_G5
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.G5 })).toBeTruthy()
        // - moveE4_C3
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.C3 })).toBeTruthy()
        // - moveE4_C5
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.C5 })).toBeTruthy()
    }

    @Test('A Knight can move two squares vertically and one square horizontally')
    testCanMoveThreeVerticalAndOneHorizontal() {
        // TODO:
        // Check the following moves are possible:
        // - moveE4_F2
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.F2 })).toBeTruthy()
        // - moveE4_F6
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.F6 })).toBeTruthy()
        // - moveE4_D2
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.D2 })).toBeTruthy()
        // - moveE4_D6
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.D6 })).toBeTruthy()
    }

    @Test('A Knight can leap other pieces')
    testCanLeapOtherPieces() {
        // TODO:
        putPiece(chessboard,positions.D4, pieces.whitePawn)
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.C3 })).toBeTruthy()
    }

    @Test('A Knight cannot move diagonally')
    testCannotMoveDiagonally() {
        // TODO:
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.B1})).not.toBeTruthy()
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.A8})).not.toBeTruthy()
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.H1})).not.toBeTruthy()
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.H7})).not.toBeTruthy()
    }

    @Test('A Knight cannot move horizontally')
    testCannotMoveHorizontally() {
        // TODO:
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.H4})).not.toBeTruthy()
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.A4})).not.toBeTruthy()
    }

    @Test('A Knight cannot move vertically')
    testCannotMoveVertically() {
        // TODO:
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.E1})).not.toBeTruthy()
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.E8})).not.toBeTruthy()
    }

    @Test('A Knight can capture a piece from another color')
    testCanCaptureAnotherColor() {
        // TODO:
        putPiece(chessboard,positions.C3, pieces.blackPawn)
        Expect(isPossible.knightMove(chessboard, { from: positions.E4, to: positions.C3 })).toBeTruthy();
    }

    @Test('A Knight cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        putPiece(chessboard,positions.C3, pieces.whitePawn)
        Expect(isPossible.knightMove(chessboard, {from: positions.E4, to: positions.C3})).not.toBeTruthy()
    }
}
