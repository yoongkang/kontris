import Game from './game';
import Renderer from './renderer';


const main = (kontra: any) => {
  let game = new Game();
  let renderer = new Renderer(kontra, game);
  renderer.start();
}

export default main;
