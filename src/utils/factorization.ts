import { TileInstance } from '../types/tiles';
import { countTiles } from './expression';
import { getTileSize, VARIABLE_LENGTH } from './grid';

export type FactorizationResult = {
  isRect: boolean;
  factors: [string, string] | null;
  gaps: Array<{ x: number; y: number }>;
  overlaps: Array<{ x: number; y: number }>;
  bounds: { minX: number; minY: number; maxX: number; maxY: number } | null;
};

export function detectFactorization(tiles: TileInstance[]): FactorizationResult {
  const occupied = new Map<string, string>();
  const overlaps: Array<{ x: number; y: number }> = [];
  const gaps: Array<{ x: number; y: number }> = [];

  let hasCells = false;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let hasNegative = false;

  for (const tile of tiles) {
    if (tile.sign === -1) {
      hasNegative = true;
    }
    const size = getTileSize(tile);
    for (let dx = 0; dx < size.width; dx += 1) {
      for (let dy = 0; dy < size.height; dy += 1) {
        const x = tile.x + dx;
        const y = tile.y + dy;
        const key = `${x},${y}`;

        if (occupied.has(key)) {
          overlaps.push({ x, y });
        } else {
          occupied.set(key, tile.id);
        }

        hasCells = true;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (!hasCells) {
    return {
      isRect: false,
      factors: null,
      gaps,
      overlaps,
      bounds: null
    };
  }

  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        gaps.push({ x, y });
      }
    }
  }

  const isRect = overlaps.length === 0 && gaps.length === 0;
  const bounds = { minX, minY, maxX, maxY };

  if (!isRect || hasNegative) {
    return { isRect, factors: null, gaps, overlaps, bounds };
  }

  const widthCells = maxX - minX + 1;
  const heightCells = maxY - minY + 1;
  const counts = countTiles(tiles);

  let factors: [string, string] | null = null;

  for (let a = 1; a <= Math.floor(widthCells / VARIABLE_LENGTH); a += 1) {
    const b = widthCells - a * VARIABLE_LENGTH;
    if (b < 0) {
      continue;
    }
    for (let c = 1; c <= Math.floor(heightCells / VARIABLE_LENGTH); c += 1) {
      const d = heightCells - c * VARIABLE_LENGTH;
      if (d < 0) {
        continue;
      }
      if (
        a * c === counts.x2 &&
        a * d + b * c === counts.x &&
        b * d === counts.one
      ) {
        factors = [formatFactor(a, b), formatFactor(c, d)];
        break;
      }
    }
    if (factors) {
      break;
    }
  }

  return { isRect, factors, gaps, overlaps, bounds };
}

function formatFactor(a: number, b: number) {
  const xPart = a === 1 ? 'x' : `${a}x`;
  if (b === 0) {
    return xPart;
  }
  return `${xPart} + ${b}`;
}
