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

export class Piece {
  rotation: number;
  color: number;
  numOrientations: number;
  orientations: Map<number, Point[]>

  constructor(rotation: number = 0) {
    this.rotation = rotation;
  }

  rotateRight() {
    this.rotation -= 1;
    if (this.rotation < 0) {
      this.rotation = this.numOrientations - 1;
    }
  }

  rotateLeft() {
    this.rotation += 1;
    if (this.rotation >= this.numOrientations) {
      this.rotation = 0;
    }
  }

  checkBlocked(game: Game, direction: string): boolean {
    if (direction === 'down') {
      let blocks = this.blocks(game.currentLocation);
      return !blocks.every(b => {
        if (b.y === GRID_HEIGHT - 1) return false;
        return game.state[b.y + 1][b.x] === 0
      });
    }
    return false;
  }

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


export class TPiece extends Piece {
  numOrientations: number = 4;
  color: number = 2;
  orientations = new Map<number, Point[]>(
    [
      [0, [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}]],
      [1, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}]],
      [2, [{x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}]],
      [3, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 0}]],
    ]
  )
}