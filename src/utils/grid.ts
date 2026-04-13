import { GridConfig, TileKind, TileSize } from '../types/tiles';

export const GRID_CONFIG: GridConfig = {
  columns: 12,
  rows: 8,
  cellSize: 52
};

export const TILE_SIZES: Record<TileKind, TileSize> = {
  x2: { width: 2, height: 2 },
  x: { width: 2, height: 1 },
  '1': { width: 1, height: 1 }
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function snapToGrid(value: number, cellSize: number) {
  return Math.round(value / cellSize);
}
