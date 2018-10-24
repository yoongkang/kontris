
export const GRID_WIDTH: number = 10;
export const GRID_HEIGHT: number = 16;

export const BLANK = 0;
export const OCCUPIED = 1;
export const BLOCK_SIZE = 35;

export const COLORS = new Map<number, string>(
  [[0, "white"], [1, "blue"]]
);

export const START_X: number = 400 - BLOCK_SIZE * GRID_WIDTH / 2;
export const START_Y: number = 20;