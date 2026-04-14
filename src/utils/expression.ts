import { TileInstance, TileKind } from '../types/tiles';
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

export type ParseResult = {
  counts: Counts;
  error?: string;
};

export function parseExpression(input: string): ParseResult {
  const raw = input.trim();
  if (!raw) {
    return { counts: { x2: 0, x: 0, one: 0 }, error: 'empty' };
  }

  const normalized = raw
    .replace(/\u2212/g, '-')
    .replace(/\s+/g, '')
    .replace(/x²/gi, 'x^2')
    .toLowerCase();

  const terms = normalized.match(/[+-]?[^+-]+/g);
  if (!terms) {
    return { counts: { x2: 0, x: 0, one: 0 }, error: 'invalid' };
  }

  const counts: Counts = { x2: 0, x: 0, one: 0 };

  for (const term of terms) {
    if (!term) {
      continue;
    }

    if (term.includes('x^2')) {
      const value = term.replace('x^2', '');
      const coefficient = parseCoefficient(value);
      if (coefficient === null) {
        return { counts, error: 'invalid' };
      }
      counts.x2 += coefficient;
      continue;
    }

    if (term.includes('x')) {
      const value = term.replace('x', '');
      const coefficient = parseCoefficient(value);
      if (coefficient === null) {
        return { counts, error: 'invalid' };
      }
      counts.x += coefficient;
      continue;
    }

    const constant = Number(term);
    if (Number.isNaN(constant)) {
      return { counts, error: 'invalid' };
    }
    counts.one += constant;
  }

  return { counts };
}

function parseCoefficient(value: string): number | null {
  if (value === '' || value === '+') {
    return 1;
  }
  if (value === '-') {
    return -1;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
}

export function applyZeroPairs(
  tiles: TileInstance[],
  selectedIds: string[]
): TileInstance[] {
  const scopeIds = new Set(selectedIds);
  const scopedTiles = scopeIds.size
    ? tiles.filter((tile) => scopeIds.has(tile.id))
    : tiles;

  const removeIds = new Set<string>();
  const kinds: TileKind[] = ['x2', 'x', '1'];

  for (const kind of kinds) {
    const positives = scopedTiles.filter(
      (tile) => tile.kind === kind && tile.sign === 1
    );
    const negatives = scopedTiles.filter(
      (tile) => tile.kind === kind && tile.sign === -1
    );
    const removeCount = Math.min(positives.length, negatives.length);
    positives.slice(0, removeCount).forEach((tile) => removeIds.add(tile.id));
    negatives.slice(0, removeCount).forEach((tile) => removeIds.add(tile.id));
  }

  return tiles.filter((tile) => !removeIds.has(tile.id));
}
