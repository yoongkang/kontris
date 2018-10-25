import {
  GRID_HEIGHT, GRID_WIDTH, BLANK, COLORS
} from './constants';

import { Piece, TPiece, Point, Block } from './pieces';
import { flatten } from './helpers';


/**
 * Main game class
 */
export default class Game {
  state: number[][];
  currentPiece: Piece;
  currentLocation: Point;

  constructor(state?: number[][]) {
    this.state = state || this.getDefaultState();
    this.currentPiece = new TPiece(2);
    this.currentLocation = {x: 4, y: 6}
  }

  tick() {
    let landed = this.currentPiece.checkLanded(this);
    if (!landed) {
      this.currentLocation.y += 1;
    } else {

    }
  }

  rotateLeft() {
    this.currentPiece.rotateLeft();
  }

  rotateRight() {
    this.currentPiece.rotateRight();
  }

  /**
   * Get all blocks in the game, including landed blocks, empty,
   * and the blocks of the currentPiece
   */
  getAllBlocks(): Block[] {
    let gridBlocks = this.state.map((row, y) => {
      return row.map((block, x) => {
        return {
          x: x,
          y: y,
          color: block
        };
      }).filter(x => x.color !== 0);
    });

    // let currentPieceBlocks: Block[] = [];
    let currentPieceBlocks = this.currentPiece.blocks(this.currentLocation);
    return flatten([...gridBlocks, ...currentPieceBlocks]);
  }

  /**
   * Returns default blank state for game
   */
  getDefaultState(): number[][] {
    const range = new Array(GRID_HEIGHT).fill(0);
    return range.map(x => new Array(GRID_WIDTH).fill(BLANK));
  }
}