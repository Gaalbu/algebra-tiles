import { TileKind, TileSign } from '../types/tiles';
import { GRID_CONFIG } from '../utils/grid';

type HeroTile = {
  kind: TileKind;
  sign: TileSign;
  x: number;
  y: number;
  w: number;
  h: number;
  vertical?: boolean;
};

const CELL = GRID_CONFIG.cellSize;

/* (x + 1)(x + 2) = x² + 3x + 2, com x = 2 células */
const TILES: HeroTile[] = [
  { kind: 'x2', sign: 1, x: 0, y: 0, w: 2, h: 2 },
  { kind: 'x', sign: 1, x: 0, y: 2, w: 2, h: 1 },
  { kind: 'x', sign: 1, x: 2, y: 0, w: 1, h: 2, vertical: true },
  { kind: 'x', sign: 1, x: 3, y: 0, w: 1, h: 2, vertical: true },
  { kind: '1', sign: 1, x: 2, y: 2, w: 1, h: 1 },
  { kind: '1', sign: 1, x: 3, y: 2, w: 1, h: 1 }
];

const LABEL: Record<TileKind, string> = { x2: 'x²', x: 'x', '1': '1' };

export function HeroTiles() {
  return (
    <figure className="hero-tiles" aria-hidden="true">
      <div className="hero-tiles-board" style={{ width: 4 * CELL, height: 3 * CELL }}>
        {TILES.map((tile, index) => (
          <div
            key={index}
            className={`tile tile-${tile.kind} pos hero-tile`}
            style={{
              left: tile.x * CELL,
              top: tile.y * CELL,
              width: tile.w * CELL,
              height: tile.h * CELL
            }}
          >
            {`+${LABEL[tile.kind]}`}
          </div>
        ))}
      </div>
      <figcaption className="mono">x² + 3x + 2 = (x + 1)(x + 2)</figcaption>
    </figure>
  );
}
