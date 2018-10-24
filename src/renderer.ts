import Game from './game';
import {
  BLOCK_SIZE, COLORS, START_X, START_Y, GRID_WIDTH, GRID_HEIGHT
} from './constants';

/**
 * Wrapper for the Kontra library
 */
export default class Renderer {
  __kontra: any;
  game: Game;

  constructor(kontra: any, game: Game) {
    this.__kontra = kontra;
    this.game = game;
  }

  sprites(): any[][] {
    return this.game.state.map((row, y) => {
      return row.map((block, x): any[] => {
        return this.__kontra.sprite({
          x: START_X + x * BLOCK_SIZE,
          y: START_Y + y * BLOCK_SIZE,
          height: BLOCK_SIZE,
          width: BLOCK_SIZE,
          color: COLORS.get(block)
        });
      })
    });
  }

  start() {
    this.__kontra.init();
    let loop = this.__kontra.gameLoop({
      update: (dt: number) => {
        // this.sprites().forEach(
        //   x => x.forEach(y => y.render())
        // );
      },

      render: () => {
        let gridBox = this.__kontra.sprite({
          x: START_X,
          y: START_Y,
          width: BLOCK_SIZE * GRID_WIDTH,
          height: BLOCK_SIZE * GRID_HEIGHT,
        });

        gridBox.draw();
        gridBox.context.strokeStyle = 'black';
        gridBox.context.lineWidth = 1;
        gridBox.context.strokeRect(
          gridBox.x, gridBox.y, gridBox.width,
          gridBox.height
        );

        this.sprites().forEach(
          x => x.forEach(y => {
            y.render()
          })
        );

      }
    });
    loop.start();
  }

}