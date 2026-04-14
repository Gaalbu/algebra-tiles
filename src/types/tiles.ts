export type TileKind = 'x2' | 'x' | '1';

export type TileSign = 1 | -1;

export type TileInstance = {
  id: string;
  kind: TileKind;
  sign: TileSign;
  x: number;
  y: number;
  orientation?: 'horizontal' | 'vertical';
};

export type InventoryItem = {
  kind: TileKind;
  sign: TileSign;
  label: string;
};

export type GridConfig = {
  columns: number;
  rows: number;
  cellSize: number;
};

export type TileSize = {
  width: number;
  height: number;
};
