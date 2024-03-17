import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';

let chessboard: Chessboard;

export class TestQueenMoves {
    @Setup
    beforeEach() {
        // TODO:
        // Initialize an empty chessboard
        // Place a white Queen on E4
        chessboard=createEmptyChessboard();
        putPiece(chessboard, positions.E4, pieces.whiteQueen)
    }

    @Test('A Queen can move diagonally')
    testCanMoveDiagonally() {
        // TODO:
        // Check the following moves are possible:
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.A8 })).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.B1 })).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.H7 })).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.H1 })).toBeTruthy();
    }

    @Test('A Queen can move horizontally')
    testCanMoveHorizontally() {
        // TODO:
        // Check the following moves are possible: moveE4_H4, moveE4_A4
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.H4 })).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.A4 })).toBeTruthy();
    }

    @Test('A Queen can move vertically')
    testCanMoveVertically() {
        // TODO:
        // Check the following moves are possible: moveE4_E1, moveE4_E8
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.E8 })).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.E1 })).toBeTruthy();
    }

    @Test('A Queen can only move horizontally, vertically, and diagonally')
    testForbiddenMoves() {
        // Check the following moves are impossible: moveE4_C7, moveE4_B2
        Expect(isPossible.queenMove(chessboard, {from: positions.E4, to: positions.C7})).not.toBeTruthy();
        Expect(isPossible.queenMove(chessboard, {from: positions.E4, to: positions.B2})).not.toBeTruthy();
    }

    @Test('A Queen cannot leap other pieces')
    testCannotLeap() {
        // Place a white Pawn on C6 and  a black Pawn on F4
        putPiece(chessboard, positions.C6, pieces.whitePawn)
        putPiece(chessboard, positions.F4, pieces.blackPawn)
        // Check the moves moveE4_A8 and moveE4_H4 are impossible
        Expect(isPossible.queenMove(chessboard, {from: positions.E4, to: positions.A8})).not.toBeTruthy();
        Expect(isPossible.queenMove(chessboard, {from: positions.E4, to: positions.H4})).not.toBeTruthy();
    }

    @Test('A Queen cannot capure pieces from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        // Place a white Pawn on H4
        putPiece(chessboard, positions.H4, pieces.whitePawn)
        // Check the move moveE4_H4 is impossible
        Expect(isPossible.queenMove(chessboard, {from: positions.E4, to: positions.H4})).not.toBeTruthy();
    }

    @Test('A Queen can capure pieces from a different color')
    testCanCaptureDifferentColor() {
        // TODO:
        // Place a black Pawn on H4
        putPiece(chessboard, positions.H4, pieces.blackPawn)
        // Check the move moveE4_H4 is possible
        Expect(isPossible.queenMove(chessboard, { from: positions.E4, to: positions.H4 })).toBeTruthy();
    }
}
