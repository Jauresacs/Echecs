/**
 * Chess is played on a square board of eight rows (called ranks, 
 * denoted 1 to 8) and eight columns (called files, denoted a to h).
 */
export type Position = {
    rank: number;
    file: number;
}


export const NULL_POSITION = position(-1, -1);

/**
 * Creates a new Posistion from two numbers, representing
 * the new position's file and rank.
 * 
 * @param rank this position rank, from 0..7 
 * @param file this position file, from 0..7
 */
export function position(file:number, rank: number): Position {
    const position: Position = {rank: rank, file: file};
    return position;
}

export function bottom(pos: Position) : Position {
    const bottomPosition = {file: pos.file, rank: pos.rank - 1};
    return bottomPosition;
}

export function top(pos: Position) : Position {
    const topPosition = {file: pos.file, rank: pos.rank + 1};
    return topPosition;
}

export function left(pos: Position) : Position {
    const leftPosition = {file: pos.file - 1, rank: pos.rank};
    return leftPosition;
}

export function right(pos: Position) : Position {
    const rightPosition = {file: pos.file + 1, rank: pos.rank};
    return rightPosition;
}

export function equals(one: Position, other: Position) : boolean {
    //console.log("Equals: " + JSON.stringify(one) + ", " + JSON.stringify(other));

    return one.rank == other.rank && one.file == other.file;
}

