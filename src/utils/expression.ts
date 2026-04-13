import { TileInstance } from '../types/tiles';
import { EquationTarget } from '../types/equations';

type Counts = EquationTarget;

export function countTiles(tiles: TileInstance[]): Counts {
  return tiles.reduce(
    (acc, tile) => {
      if (tile.kind === 'x2') {
        acc.x2 += tile.sign;
      } else if (tile.kind === 'x') {
        acc.x += tile.sign;
      } else {
        acc.one += tile.sign;
      }
      return acc;
    },
    { x2: 0, x: 0, one: 0 }
  );
}

export function buildExpression(counts: Counts) {
  const terms: string[] = [];

  const pushTerm = (value: number, label: string) => {
    if (value === 0) {
      return;
    }
    const sign = value > 0 ? '+' : '-';
    const absValue = Math.abs(value);
    const magnitude = absValue === 1 && label !== '' ? '' : absValue.toString();

    const termLabel = `${magnitude}${label}`.trim();
    if (terms.length === 0) {
      terms.push(`${value < 0 ? '-' : ''}${termLabel}`);
    } else {
      terms.push(`${sign} ${termLabel}`);
    }
  };

  pushTerm(counts.x2, 'x²');
  pushTerm(counts.x, 'x');
  pushTerm(counts.one, '');

  if (terms.length === 0) {
    return '0';
  }

  return terms.join(' ');
}

export function isMatch(current: Counts, target: Counts) {
  return (
    current.x2 === target.x2 &&
    current.x === target.x &&
    current.one === target.one
  );
}
