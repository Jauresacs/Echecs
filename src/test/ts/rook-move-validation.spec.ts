import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';
import { position } from "../../main/ts/position";

let chessboard: Chessboard;

export class TestRookMoves {
    // Dans le fichier "rook-move-validation.spec.ts"
    @Setup
    beforeEach(){
        chessboard = createEmptyChessboard();

        // Note: la variable "positionE4" a été créée dans le module "predefined-positions" pour simplifier le code des tests

        // Place a rook piece on E4 on an empty chessboard
        putPiece(chessboard, positions.E4, pieces.whiteRook);
    }

    @Test("A rook can move horizontally")
    testCanMoveHorizontally() {
        Expect(isPossible.rookMove(chessboard, { from: positions.E4, to: positions.H4 })).toBeTruthy();
        Expect(isPossible.rookMove(chessboard, { from: positions.E4, to: positions.A4 })).toBeTruthy();
    }
    @Test('A Rook can move vertically')
    testCanMoveVertically() {
        // TODO:
        // Check the following moves are possible: moveE4_E1, moveE4_E8
            Expect(isPossible.rookMove(chessboard, { from: positions.E4, to: positions.E8 })).toBeTruthy();
            Expect(isPossible.rookMove(chessboard, { from: positions.E4, to: positions.E1 })).toBeTruthy();
        }
    @Test('A Rook cannot move diagonally')
    testCannotMoveDiagonally() {
        // TODO:
        // Check the following moves are impossible:
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
        //Expect(isPossible.rookMove(chessboard, { from: position }))
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.B1})).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.A8})).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.H1})).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.H7})).not.toBeTruthy();
    }

    @Test('A Rook can capture a piece from different color')
    testCanCaptureDifferentColor() {
        // TODO:
        // Place a black Pawn on H4
        // Check the move moveE4_H4 is possible
        putPiece(chessboard, positions.H4, pieces.blackPawn)
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.H4})).toBeTruthy();
    }

    @Test('A Rook cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        // Place a white Pawn on H4
        // Check the move moveE4_H4 is impossible
        putPiece(chessboard, positions.H4, pieces.whitePawn)
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.H4})).not.toBeTruthy();
    }

    @Test('A Rook cannot leap other pieces, when moving horizontally')
    testCannotLeapHorizontally() {
        // TODO:
        // Place a black Pawn on F4
        // Check the move moveE4_H4 is impossible
        putPiece(chessboard, positions.F4, pieces.blackPawn)
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.H4})).not.toBeTruthy();
    }

    @Test('A Rook cannot leap other pieces, when moving vertically')
    testCannotLeapvertically() {
        // TODO:
        // Place a black Pawn on E3
        // Check the move moveE4_E1 is impossible
        putPiece(chessboard, positions.E3, pieces.blackPawn)
        Expect(isPossible.rookMove(chessboard, {from: positions.E4, to: positions.E1})).not.toBeTruthy();
    }
}
