import { TileInstance } from '../types/tiles';
import { GRID_CONFIG, TILE_SIZES } from '../utils/grid';

type TilePieceProps = {
  tile: TileInstance;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export function TilePiece({ tile, onPointerDown }: TilePieceProps) {
  const size = TILE_SIZES[tile.kind];
  const pxWidth = size.width * GRID_CONFIG.cellSize;
  const pxHeight = size.height * GRID_CONFIG.cellSize;

  const label = tile.kind === '1' ? '1' : tile.kind === 'x' ? 'x' : 'x^2';
  const sign = tile.sign === 1 ? '+' : '-';

  return (
    <div
      className={`tile tile-${tile.kind} ${tile.sign === 1 ? 'pos' : 'neg'}`}
      style={{
        width: pxWidth,
        height: pxHeight
      }}
      onPointerDown={onPointerDown}
    >
      <span>{`${sign}${label}`}</span>
    </div>
  );
}
