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
  tickCounter: number
  pressed: boolean

  constructor(kontra: any, game: Game) {
    this.__kontra = kontra;
    this.game = game;
    this.tickCounter = 0.0;
    this.pressed = false;
  }

  /**
   * Get all the sprites we want to render
   */
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

  /**
   * Callback to update game at each timedelta
   * TODO: break the commands into separate classes
   */
  update(dt: number) {
    this.tickCounter += dt;
    if (this.tickCounter >= this.game.dropDelay) {
      this.tickCounter = 0;
      this.game.tick();
    }

    const q = this.__kontra.keys.pressed('q');
    const w = this.__kontra.keys.pressed('w');
    const left = this.__kontra.keys.pressed('left');
    const right = this.__kontra.keys.pressed('right');
    const down = this.__kontra.keys.pressed('down');
    const up = this.__kontra.keys.pressed('up');
    const enter = this.__kontra.keys.pressed('enter');
    const space = this.__kontra.keys.pressed('space');
    if (this.game.gameOver) {
      if (enter) {
        this.game.restart();
      }
    }
    if (!this.pressed && !this.game.gameOver) {
      if (q || up) {
        this.pressed = true;
        this.game.rotateLeft();
      }
      if (w) {
        this.pressed = true;
        this.game.rotateRight();
      }
      if (left) {
        this.pressed = true;
        this.game.moveLeft();
      }
      if (right) {
        this.pressed = true;
        this.game.moveRight();
      }
      if (down) {
        this.pressed = true;
        if (!this.game.moveDown()) this.game.land();
      }
      if (space) {
        this.pressed = true;
        this.game.drop();
        this.game.land();
      }
    } else {
      if (!(q || w || left || right || down || up || space)) {
        this.pressed = false;
      }
    }

  }

  /**
   * Draws the grid box (the playing area)
   */
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


  /**
   * Renders the entire game
   */
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


  /**
   * Initializes the game
   */
  start() {
    this.__kontra.init();
    let loop = this.__kontra.gameLoop({
      update: this.update.bind(this),

      render: this.render.bind(this)
    });
    loop.start();
  }

}