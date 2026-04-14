import { TileInstance } from '../types/tiles';
import { getTileSize, GRID_CONFIG } from '../utils/grid';

type TilePieceProps = {
  tile: TileInstance;
  isSelected?: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
};

export function TilePiece({ tile, isSelected, onPointerDown }: TilePieceProps) {
  const size = getTileSize(tile);
  const pxWidth = size.width * GRID_CONFIG.cellSize;
  const pxHeight = size.height * GRID_CONFIG.cellSize;

  const label = tile.kind === '1' ? '1' : tile.kind === 'x' ? 'x' : 'x²';
  const sign = tile.sign === 1 ? '+' : '-';

  return (
    <div
      className={`tile tile-${tile.kind} ${tile.sign === 1 ? 'pos' : 'neg'} ${
        isSelected ? 'selected' : ''
      }`}
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
