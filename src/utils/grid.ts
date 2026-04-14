import { GridConfig, TileInstance, TileKind, TileSize } from '../types/tiles';

export const GRID_CONFIG: GridConfig = {
  columns: 12,
  rows: 8,
  cellSize: 52
};

export const VARIABLE_LENGTH = 2;

export const TILE_SIZES: Record<TileKind, TileSize> = {
  x2: { width: VARIABLE_LENGTH, height: VARIABLE_LENGTH },
  x: { width: VARIABLE_LENGTH, height: 1 },
  '1': { width: 1, height: 1 }
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function snapToGrid(value: number, cellSize: number) {
  return Math.round(value / cellSize);
}

export function layoutTiles(tiles: TileInstance[], columns: number) {
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 1;

  return tiles.map((tile) => {
    const size = TILE_SIZES[tile.kind];
    if (cursorX + size.width > columns) {
      cursorX = 0;
      cursorY += rowHeight;
      rowHeight = 1;
    }
    const nextTile = {
      ...tile,
      x: cursorX,
      y: cursorY
    };
    cursorX += size.width;
    rowHeight = Math.max(rowHeight, size.height);
    return nextTile;
  });
}
