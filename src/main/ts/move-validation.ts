import { Chessboard, isEmpty, Square, squareAtPosition } from './chessboard';
import { Move } from './movements';
import { equals, left, right, top, bottom} from './position';

/**
 * Checks whether a Black Pawn can perform a given move.
 * A pawn can move forward to the unoccupied square immediately in front of
 * it on the same file, or on its first move it can advance two squares along
 * the same file, provided both squares are unoccupied (black dots in the
 * diagram); or the pawn can capture an opponent's piece on a square diagonally
 * in front of it on an adjacent file, by moving to that square (black "x"s).
 *
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function blackPawnMove(board: Chessboard, move: Move): boolean {
    if (equals(move.to, bottom(move.from))) {
        //console.log("Single forward");
        return isEmpty(board, move.to);
    }

    if (move.from.rank == 6 && equals(move.to, bottom(bottom(move.from)))) {
        //console.log("Double forward");
        return isEmpty(board, bottom(move.from)) && isEmpty(board, move.to);
    }

    if (equals(move.to, left(bottom(move.from))) || equals(move.to, right(bottom(move.from)))) {
        const destination: Square = squareAtPosition(board, move.to);
        return !(destination.isEmpty || !destination.piece.isWhite);
    }

    return false;
}

/**
 * A pawn can move forward to the unoccupied square immediately in front of
 * it on the same file, or on its first move it can advance two squares along
 * the same file, provided both squares are unoccupied (black dots in
 * the diagram); or the pawn can capture an opponent's piece on a square diagonally
 * in front of it on an adjacent file, by moving to that square (black "x"s).
 *
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function whitePawnMove(board: Chessboard, move: Move): boolean {
    if (equals(move.to, top(move.from))) {
        return isEmpty(board, move.to);
    }

    if (move.from.rank == 1 && equals(move.to, top(top(move.from)))) {
        return isEmpty(board, top(move.from)) && isEmpty(board, move.to);
    }

    if (equals(move.to, left(top(move.from))) || equals(move.to, right(top(move.from)))) {
        const destination: Square = squareAtPosition(board, move.to);
        return !(destination.isEmpty || destination.piece.isWhite);
    }

    return false;
}

/**
 * Checks whether a King can perform a given move.
 * The king moves one square in any direction.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function kingMove(board: Chessboard, move: Move): boolean {
    const destination: Square = squareAtPosition(board, move.to);
    const departure : Square = squareAtPosition(board, move.from);

    if((Math.abs(move.from.file-move.to.file)<=1) && Math.abs(move.from.rank-move.to.rank)<=1){
        return (destination.isEmpty || (destination.piece.isWhite !== departure.piece.isWhite));
    }
    else
    {
        return false;
    }
}



/**
 * Checks whether a Rook can perform a given move.
 * An Rook can move any number of squares along a rank or file,
 * but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move
 */
export function rookMove(board: Chessboard, move: Move): boolean {

    const destination: Square = squareAtPosition(board, move.to);
    const departure : Square = squareAtPosition(board, move.from);

    if(move.from.file===move.to.file || move.from.rank===move.to.rank){
        if(move.from.file===move.to.file){
            if(move.to.rank>move.from.rank){
                //Horizontal movement of the rook by going up
                for (let i: number = move.from.rank + 1; i < move.to.rank; i++) {
                    let square: Square = board.board[move.to.file][i];
                    if (!square.isEmpty) {
                      return false;
                    }
                }
            }
            else{
                //Horizontal movement of the rook by going douwn
                for(let i:number=move.to.rank+1; i<move.from.rank; i++){
                    let square: Square= board.board[move.to.file][i];
                    if(!square.isEmpty){
                        return false;
                    }
                }
            }
        }
        else{
        if(move.to.file>move.from.file){
            //Vertical movement of the rook by going to the right
            for(let i:number=move.from.file+1; i<move.to.file; i++){
                let square: Square= board.board[i][move.to.rank];
                if(!square.isEmpty){
                    return false;
                }
            }
        }
        else{
            //Vertical movement of the rook by going to the left
            for(let i:number=move.to.file+1; i<move.from.file; i++){
                let square: Square= board.board[i][move.to.rank];
                if(!square.isEmpty){
                    return false;
                }
            }
        
        }
    }
        return (destination.isEmpty || (destination.piece.isWhite !== departure.piece.isWhite));
    }
    return false;
}


/**
 * Checks whether a Bishop can perform a given move.
 * A Bishop can move any number of squares diagonally,
 * but cannot leap over other pieces.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function bishopMove(board: Chessboard, move: Move): boolean {
    const destination: Square = squareAtPosition(board, move.to);
    const departure : Square = squareAtPosition(board, move.from);
    if(Math.abs(move.from.file-move.to.file)===Math.abs(move.from.rank-move.to.rank)){
        if(move.to.file>move.from.file && move.to.rank>move.from.rank){
            //Diagonal movement of the bishop going to the top right
            let newFile: number= move.from.file+1;
            let newRank:number= move.from.rank +1;
            while(newFile<move.to.file && newRank< move.to.rank){
                let square: Square= board.board[newFile][newRank];
                if(!square.isEmpty){
                    return false;
                }
                newFile++;
                newRank++;
            }
        }
        if(move.to.file<move.from.file && move.to.rank<move.from.rank){
            //Diagonal movement of the bishop by going down to the left
            let newFile: number= move.from.file-1;
            let newRank: number= move.from.rank-1;
            while(newFile> move.to.file && newRank> move.to.rank){
                let square: Square= board.board[newFile][newRank];
                if(!square.isEmpty){
                    return false ;
                }
                newFile--;
                newRank--;
            }
        }
        if(move.to.file> move.from.file && move.from.rank<move.to.rank){
            //Diagonal movement of the bishop by going down to the left
            let newFile: number= move.from.file+1;
            let newRank: number= move.from.rank-1;
            while(newFile< move.to.file && newRank> move.to.rank);
            {
                let square: Square= board.board[newFile][newRank];
                if(!square.isEmpty){
                    return false ;
                }
                newFile++;
                newRank--;
            }

        }
        if(move.to.file< move.from.file && move.from.rank<move.to.rank){
            //Diagonal movement of the bishop by going down to the right
            let newFile: number= move.from.file-1;
            let newRank: number= move.from.rank+1;
            while(newFile> move.to.file && newRank< move.to.rank){
                let square: Square= board.board[newFile][newRank];
                if(!square.isEmpty){
                    return false ;
                }
                newFile--;
                newRank++;
            }

        }
        return (destination.isEmpty || (destination.piece.isWhite !== departure.piece.isWhite));
    }
    return false;
}

/**
 * Checks whether a Knight can perform a given move.
 * The Knight move forms an "L"-shape:
 * two squares vertically and one square horizontally, or two
 * squares horizontally and one square vertically.)
 *
 * The Knight can leap over other pieces.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function knightMove(board: Chessboard, move: Move): boolean {
    
    const destination: Square = squareAtPosition(board, move.to);
    const departure : Square = squareAtPosition(board, move.from);

   
    if (Math.abs(move.from.rank-move.to.rank)==2 && Math.abs(move.from.file-move.to.file)==1 ){
         return (destination.isEmpty || (destination.piece.isWhite !== departure.piece.isWhite));

    }
    else
    {
        if (Math.abs(move.from.rank-move.to.rank)==1 && Math.abs(move.from.file-move.to.file)==2 ){
            return (destination.isEmpty || (destination.piece.isWhite !== departure.piece.isWhite));

        }
        else{
           return false;
        }


    }
}
    /**
 * Checks whether a Queen can perform a given move.
 * The queen combines the power of a rook and bishop and can move any
 * number of squares along a rank, file, or diagonal, but cannot leap over other pieces.
 *
 * @param board The chessboard of the current 
 * @param move
 */
export function queenMove(board: Chessboard, move: Move): boolean {
    return (rookMove(board,move) || bishopMove(board,move));
}
