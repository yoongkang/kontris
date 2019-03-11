import Game from './game';
import { GRID_HEIGHT } from './constants';

export interface Point {
  x: number;
  y: number;
}

export interface Block {
  x: number;
  y: number;
  color: number;
}

/**
 * "Abstract" class for a tetris piece
 */
export class Piece {
  rotation: number;
  color: number;
  numOrientations: number;
  orientations: Map<number, Point[]>

  /**
   * Get a random orientation
   */
  getRandomRotation(): number {
    return Math.floor(Math.random() * Math.floor(this.numOrientations));
  }

  /**
   * Starting point for this piece
   */
  getStartingPoint(): Point {
    return {x: 4, y: 0}
  }

  /**
   * Rotate the piece right and returns the right position
   * depending on the game's state
   */
  rotateRight(game: Game) {
    const oldRotation = this.rotation;
    this.rotation -= 1;
    if (this.rotation < 0) {
      this.rotation = this.numOrientations - 1;
    }
    if (!game.checkLegal()) {
      this.rotation = oldRotation;
    }
  }

  /**
   * Rotate the piece left and returns the right position
   * depending on the game's state
   */
  rotateLeft(game: Game) {
    const oldRotation = this.rotation;
    this.rotation += 1;
    if (this.rotation >= this.numOrientations) {
      this.rotation = 0;
    }
    if (!game.checkLegal()) {
      this.rotation = oldRotation;
    }
  }

  /**
   * Returns the absolute coordinates given the position of
   * the centroid
   */
  blocks(centroid: Point): Block[] {
    const offsets = this.orientations.get(this.rotation);
    return offsets.map(offset => {
      return {
        x: centroid.x + offset.x,
        y: centroid.y + offset.y,
        color: this.color
      }
    }).filter(x => x.y >= 0);
  }


}


/**
 * Represents the T-piece
 */
export class TPiece extends Piece {
  numOrientations: number;
  color: number = 2;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}]],
      [1, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}]],
      [2, [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}]],
      [3, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 0}]],
    ]
  )

  constructor() {
    super();
    this.numOrientations = 4;
    this.rotation = this.getRandomRotation();
  }

}

/**
 * Represents the square piece
 */
export class SquarePiece extends Piece {
  numOrientations: number;
  color: number = 3;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]]
    ]
  )

  constructor() {
    super();
    this.numOrientations = 1;
    this.rotation = this.getRandomRotation();
  }
}

/**
 * Represents the L piece
 */
export class LPiece extends Piece {
  numOrientations: number;
  color: number = 6;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 1}]],
      [1, [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: -1}]],
      [2, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: -1}]],
      [3, [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}]],
    ]
  )

  constructor() {
    super();
    this.numOrientations = 4;
    this.rotation = this.getRandomRotation();
  }
}

/**
 * Represents the Reverse-L piece
 */
export class ReverseLPiece extends Piece {
  numOrientations: number;
  color: number = 1;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 1}]],
      [1, [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: 1}]],
      [2, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: -1}]],
      [3, [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: -1}]],
    ]
  )

  constructor() {
    super();
    this.numOrientations = 4;
    this.rotation = this.getRandomRotation();
  }
}

/**
 * Represents the S piece
 */
export class SPiece extends Piece {
  numOrientations: number;
  color: number = 5;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}]],
      [1, [{x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}]],
    ]
  )

  constructor() {
    super();
    this.numOrientations = 2;
    this.rotation = this.getRandomRotation();
  }
}

/**
 * Represents the Z piece
 */
export class ZPiece extends Piece {
  numOrientations: number;
  color: number = 7;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]],
      [1, [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}, {x: 0, y: 1}]],
    ]
  )

  constructor() {
    super();
    this.numOrientations = 2;
    this.rotation = this.getRandomRotation();
  }
}

/**
 * Represents the I piece (the long one)
 */
export class IPiece extends Piece {
  numOrientations: number;
  color: number = 4;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: -1, y: 0}, {x: -2, y: 0}, {x: 1, y: 0}]],
      [1, [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: -2}, {x: 0, y: 1}]],
    ]
  )

  constructor() {
    super();
    this.numOrientations = 2;
    this.rotation = this.getRandomRotation();
  }
}


const pieces = [TPiece, SquarePiece, LPiece, ReverseLPiece, SPiece, ZPiece, IPiece]

export const getRandomPiece = (): Piece => {
  let rn = Math.floor(Math.random() * Math.floor(pieces.length));
  return new pieces[rn]();
}