import { InventoryItem, TileKind, TileSign } from '../types/tiles';

type TileLegendEntry = {
  id: string;
  kind?: TileKind;
  sign?: TileSign;
  representation: string;
  swatchClass?: string;
};

type SignPair = {
  pos: TileLegendEntry;
  neg: TileLegendEntry;
};

const baseLegend: Record<TileKind, SignPair> = {
  '1': {
    pos: {
      id: 'unit-pos',
      kind: '1',
      sign: 1,
      representation: '+1',
      swatchClass: 'tile-1 pos'
    },
    neg: {
      id: 'unit-neg',
      kind: '1',
      sign: -1,
      representation: '-1',
      swatchClass: 'tile-1 neg'
    }
  },
  x: {
    pos: {
      id: 'linear-pos',
      kind: 'x',
      sign: 1,
      representation: '+x',
      swatchClass: 'tile-x pos'
    },
    neg: {
      id: 'linear-neg',
      kind: 'x',
      sign: -1,
      representation: '-x',
      swatchClass: 'tile-x neg'
    }
  },
  x2: {
    pos: {
      id: 'quadratic-pos',
      kind: 'x2',
      sign: 1,
      representation: '+x²',
      swatchClass: 'tile-x2 pos'
    },
    neg: {
      id: 'quadratic-neg',
      kind: 'x2',
      sign: -1,
      representation: '-x²',
      swatchClass: 'tile-x2 neg'
    }
  }
};

export const TILE_LEGEND: TileLegendEntry[] = [
  baseLegend['1'].pos,
  baseLegend['1'].neg,
  baseLegend.x.pos,
  baseLegend.x.neg,
  baseLegend.x2.pos,
  baseLegend.x2.neg,
  {
    id: 'dual-face',
    representation: '±1, ±x, ±x²'
  },
  {
    id: 'fragments',
    representation: '—'
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  baseLegend.x2.pos,
  baseLegend.x2.neg,
  baseLegend.x.pos,
  baseLegend.x.neg,
  baseLegend['1'].pos,
  baseLegend['1'].neg
].map((entry) => ({
  kind: entry.kind as TileKind,
  sign: entry.sign as TileSign,
  label: entry.representation
}));
