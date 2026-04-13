import React, { useRef, useState } from 'react';
import { TileInstance } from '../types/tiles';
import { clamp, GRID_CONFIG, snapToGrid, TILE_SIZES } from '../utils/grid';
import { TilePiece } from './TilePiece';

type GridBoardProps = {
  tiles: TileInstance[];
  onTileMove: (id: string, x: number, y: number) => void;
};

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
  pointerId: number;
};

export function GridBoard({ tiles, onTileMove }: GridBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const boardWidth = GRID_CONFIG.columns * GRID_CONFIG.cellSize;
  const boardHeight = GRID_CONFIG.rows * GRID_CONFIG.cellSize;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState || event.pointerId !== dragState.pointerId) {
      return;
    }

    const board = boardRef.current;
    if (!board) {
      return;
    }

    const rect = board.getBoundingClientRect();
    const rawX = event.clientX - rect.left - dragState.offsetX;
    const rawY = event.clientY - rect.top - dragState.offsetY;

    const targetTile = tiles.find((tile) => tile.id === dragState.id);
    if (!targetTile) {
      return;
    }

    const size = TILE_SIZES[targetTile.kind];
    const gridX = snapToGrid(rawX, GRID_CONFIG.cellSize);
    const gridY = snapToGrid(rawY, GRID_CONFIG.cellSize);

    const maxX = GRID_CONFIG.columns - size.width;
    const maxY = GRID_CONFIG.rows - size.height;

    onTileMove(
      targetTile.id,
      clamp(gridX, 0, maxX),
      clamp(gridY, 0, maxY)
    );
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState && event.pointerId === dragState.pointerId) {
      setDragState(null);
    }
  };

  return (
    <div
      ref={boardRef}
      className="grid-board"
      style={{ width: boardWidth, height: boardHeight }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {tiles.map((tile) => {
        const size = TILE_SIZES[tile.kind];
        const left = tile.x * GRID_CONFIG.cellSize;
        const top = tile.y * GRID_CONFIG.cellSize;

        return (
          <div
            key={tile.id}
            className="tile-wrapper"
            style={{
              left,
              top,
              width: size.width * GRID_CONFIG.cellSize,
              height: size.height * GRID_CONFIG.cellSize
            }}
          >
            <TilePiece
              tile={tile}
              onPointerDown={(event) => {
                const board = boardRef.current;
                if (!board) {
                  return;
                }
                const rect = board.getBoundingClientRect();
                const offsetX = event.clientX - rect.left - left;
                const offsetY = event.clientY - rect.top - top;

                setDragState({
                  id: tile.id,
                  offsetX,
                  offsetY,
                  pointerId: event.pointerId
                });
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
