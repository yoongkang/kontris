import {
  GRID_HEIGHT, GRID_WIDTH, BLANK, OCCUPIED, BLOCK_SIZE,
  COLORS, START_X, START_Y
} from './constants';
import Renderer from './renderer';

/**
 * Main game class
 */
export default class Game {
  state: number[][];

  constructor(state?: number[][]) {
    this.state = state || this.get_default_state()
  }

  /**
   * Returns default blank state for game
   */
  get_default_state(): number[][] {
    let range = new Array(GRID_HEIGHT);
    return range.map(x => new Array(GRID_WIDTH).fill(BLANK));
  }
}