import {
  GRID_HEIGHT, GRID_WIDTH, BLANK, COLORS
} from './constants';

import { Piece, TPiece, Point, Block, getRandomPiece } from './pieces';
import { flatten } from './helpers';


/**
 * Main game class
 */
export default class Game {
  state: number[][];
  currentPiece: Piece;
  currentLocation: Point;
  dropDelay: number;
  gameOver: boolean;

  constructor(state?: number[][]) {
    this.restart();
  }

  /**
   * Reinitialize game state
   */
  restart() {
    this.state = this.getDefaultState();
    this.currentPiece = getRandomPiece();
    this.currentLocation = this.currentPiece.getStartingPoint();
    this.gameOver = false;
    this.dropDelay = 0.5;
  }

  /**
   * Check if current position is legal
   */
  checkLegal(): boolean {
    let blocks = this.currentBlocks();
    return blocks.every(b => this.blockIsLegal(b));
  }

  /**
   * Returns all the blocks for the current piece
   */
  currentBlocks() {
    return this.currentPiece.blocks(this.currentLocation);
  }

  /**
   * Clear an individual line from the grid
   */
  clearLine(rowIndex: number) {
    let newRow = [new Array(GRID_WIDTH).fill(BLANK)];
    let firstPart = this.state.slice(0, rowIndex);
    let secondPart = this.state.slice(rowIndex + 1);
    this.state = newRow.concat(firstPart, secondPart);
  }

  /**
   * Clear any lines that are full
   */
  clearLines() {
    let lines = this.state.map((row, index) => {
      if (row.every(x => x > 0)) {
        return index;
      }
      return -1;
    }).filter(x => x >= 0);
    lines.forEach(this.clearLine.bind(this));
  }

  /**
   * Logic for what happens when a piece has "landed"
   */
  land() {
    let blocks = this.currentPiece.blocks(this.currentLocation);
    blocks.forEach(block => {
      this.state[block.y][block.x] = block.color;
    });
    this.clearLines();
    this.currentPiece = getRandomPiece();
    this.currentLocation = this.currentPiece.getStartingPoint();
  }

  /**
   * Advance the game's state at each time step
   */
  tick() {
    if (this.gameOver) {
      return;
    }
    if (!this.checkLegal()) {
      this.gameOver = true;
    } else {
      if (!this.moveDown()) {
        this.land();
      }
    }
  }

  /**
   * Checks if a block is at a legal location
   */
  blockIsLegal(block: Block): boolean {
    let {x, y, color} = block;
    let inBounds = (x >= 0) && (x <= GRID_WIDTH - 1) && (y <= GRID_HEIGHT - 1);
    if (!inBounds) return false;
    return (this.state[y][x] === 0);
  }

  /**
   * Rotate the current piece to the left (CCW)
   */
  rotateLeft() {
    this.currentPiece.rotateLeft(this);
  }

    /**
   * Rotate the current piece to the left (CW)
   */
  rotateRight() {
    this.currentPiece.rotateRight(this);
  }

  /**
   * Moves the current piece down and lands it if we can't
   */
  moveDown() {
    this.currentLocation.y += 1;
    if (!this.checkLegal()) {
      this.currentLocation.y -= 1;
      return false;
    }
    return true;
  }

  drop() {
    while(this.moveDown());
    return true;
  }

  /**
   * Moves the current piece left
   */
  moveLeft() {
    this.currentLocation.x -= 1;
    if (!this.checkLegal()) {
      this.currentLocation.x += 1;
      return false;
    }
    return true;
  }

  /**
   * Moves the current piece right
   */
  moveRight() {
    this.currentLocation.x += 1;
    if (!this.checkLegal()) {
      this.currentLocation.x -= 1;
      return false;
    }
    return true;
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