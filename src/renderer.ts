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
  tick_counter: number
  drop_delay: number
  pressed: boolean

  constructor(kontra: any, game: Game) {
    this.__kontra = kontra;
    this.game = game;
    this.tick_counter = 0.0;
    this.drop_delay = 2;
    this.pressed = false;
  }

  sprites(): any[] {
    let blocks = this.game.getAllBlocks();
    return blocks.map(block => {
      return this.__kontra.sprite({
        x: START_X + block.x * BLOCK_SIZE,
        y: START_Y + block.y * BLOCK_SIZE,
        height: BLOCK_SIZE,
        width: BLOCK_SIZE,
        color: COLORS.get(block.color)
      })
    })
  }

  update(dt: number) {
    this.tick_counter += dt;
    if (this.tick_counter >= this.drop_delay) {
      this.tick_counter = 0;
      this.game.tick();
      // this.game.rotateLeft();
    }

    if (!this.pressed) {
      if (this.__kontra.keys.pressed('q')) {
        this.pressed = true;
        this.game.rotateLeft();
      }
      if (this.__kontra.keys.pressed('w')) {
        this.pressed = true;
        this.game.rotateRight();
      }
    } else {
      if (!(this.__kontra.keys.pressed('q') || (this.__kontra.keys.pressed('w')))) {
        this.pressed = false;
      }
    }

  }

  drawGridBox() {
    let gridBox = this.__kontra.sprite({
      x: START_X,
      y: START_Y,
      width: BLOCK_SIZE * GRID_WIDTH,
      height: BLOCK_SIZE * GRID_HEIGHT,
      color: 'white'
    });

    gridBox.draw();
    gridBox.context.strokeStyle = 'black';
    gridBox.context.lineWidth = 1;
    gridBox.context.strokeRect(
      gridBox.x, gridBox.y, gridBox.width,
      gridBox.height
    );
  }


  render() {
    this.drawGridBox();

    this.sprites().forEach(y => {
      if (y.color !== 'white') {
        y.draw();
        y.context.strokeStyle = 'black';
        y.context.lineWidth = 1;
        y.context.strokeRect(
          y.x, y.y, y.width,
          y.height
        );
      }

    });
  }


  start() {
    this.__kontra.init();
    let loop = this.__kontra.gameLoop({
      update: this.update.bind(this),

      render: this.render.bind(this)
    });
    loop.start();
  }

}