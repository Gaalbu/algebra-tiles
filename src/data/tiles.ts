import { InventoryItem, TileKind, TileSign } from '../types/tiles';

type TileLegendEntry = {
  id: string;
  kind?: TileKind;
  sign?: TileSign;
  name: string;
  dimensions: string;
  representation: string;
  reading: string;
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
      name: 'Quadrado verde',
      dimensions: '1 x 1',
      representation: '+1',
      reading: 'Unidade, positiva',
      swatchClass: 'tile-1 pos'
    },
    neg: {
      id: 'unit-neg',
      kind: '1',
      sign: -1,
      name: 'Quadrado cinza',
      dimensions: '1 x 1',
      representation: '-1',
      reading: 'Unidade, negativa',
      swatchClass: 'tile-1 neg'
    }
  },
  x: {
    pos: {
      id: 'linear-pos',
      kind: 'x',
      sign: 1,
      name: 'Retangulo azul',
      dimensions: '1 x 3,5',
      representation: '+x',
      reading: 'Termo linear positivo',
      swatchClass: 'tile-x pos'
    },
    neg: {
      id: 'linear-neg',
      kind: 'x',
      sign: -1,
      name: 'Retangulo laranja',
      dimensions: '1 x 3,5',
      representation: '-x',
      reading: 'Termo linear negativo',
      swatchClass: 'tile-x neg'
    }
  },
  x2: {
    pos: {
      id: 'quadratic-pos',
      kind: 'x2',
      sign: 1,
      name: 'Quadrado violeta',
      dimensions: '3,5 x 3,5',
      representation: '+x²',
      reading: 'Termo quadratico positivo',
      swatchClass: 'tile-x2 pos'
    },
    neg: {
      id: 'quadratic-neg',
      kind: 'x2',
      sign: -1,
      name: 'Quadrado amarelo',
      dimensions: '3,5 x 3,5',
      representation: '-x²',
      reading: 'Termo quadratico negativo',
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
    name: 'Peças de dupla face',
    dimensions: 'variavel',
    representation: '+/-1, +/-x ou +/-x²',
    reading: 'Mudança rápida de sinal'
  },
  {
    id: 'fragments',
    name: 'Fragmentos e tiras',
    dimensions: 'variável',
    representation: 'apoio operacional',
    reading: 'Composição, partição e organização visual'
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
