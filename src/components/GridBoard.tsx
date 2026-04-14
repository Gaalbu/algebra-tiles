import React, { useRef, useState } from 'react';
import { InventoryItem, TileInstance } from '../types/tiles';
import { clamp, getTileSize, GRID_CONFIG, snapToGrid } from '../utils/grid';
import { TilePiece } from './TilePiece';

type GridBoardProps = {
  tiles: TileInstance[];
  onTileMove: (id: string, x: number, y: number) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  isInteractive?: boolean;
  onInventoryDrop?: (item: InventoryItem, x: number, y: number) => void;
  onDragStart?: (tileId: string) => void;
  onDragEnd?: (tileId: string) => void;
};

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
  pointerId: number;
};

export function GridBoard({
  tiles,
  onTileMove,
  selectedIds,
  onSelectionChange,
  isInteractive = true,
  onInventoryDrop,
  onDragStart,
  onDragEnd
}: GridBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const boardWidth = GRID_CONFIG.columns * GRID_CONFIG.cellSize;
  const boardHeight = GRID_CONFIG.rows * GRID_CONFIG.cellSize;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || !dragState || event.pointerId !== dragState.pointerId) {
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

    const size = getTileSize(targetTile);
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
      onDragEnd?.(dragState.id);
      setDragState(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!onInventoryDrop) {
      return;
    }
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!onInventoryDrop) {
      return;
    }
    event.preventDefault();
    const data = event.dataTransfer.getData('application/x-inventory-item');
    if (!data) {
      return;
    }
    let item: InventoryItem | null = null;
    try {
      item = JSON.parse(data) as InventoryItem;
    } catch {
      item = null;
    }
    if (!item) {
      return;
    }
    const board = boardRef.current;
    if (!board) {
      return;
    }
    const rect = board.getBoundingClientRect();
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const size = getTileSize({ kind: item.kind });
    const gridX = snapToGrid(rawX, GRID_CONFIG.cellSize);
    const gridY = snapToGrid(rawY, GRID_CONFIG.cellSize);
    const maxX = GRID_CONFIG.columns - size.width;
    const maxY = GRID_CONFIG.rows - size.height;
    onInventoryDrop(item, clamp(gridX, 0, maxX), clamp(gridY, 0, maxY));
  };

  const handleBoardPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    onSelectionChange([]);
  };

  const handleTilePointerDown = (
    tileId: string,
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const isMulti = event.shiftKey || event.ctrlKey || event.metaKey;
    if (isMulti) {
      if (selectedIds.includes(tileId)) {
        onSelectionChange(selectedIds.filter((id) => id !== tileId));
      } else {
        onSelectionChange([...selectedIds, tileId]);
      }
    } else if (!selectedIds.includes(tileId) || selectedIds.length > 1) {
      onSelectionChange([tileId]);
    }

    if (!isInteractive) {
      return;
    }

    const board = boardRef.current;
    if (!board) {
      return;
    }
    const rect = board.getBoundingClientRect();
    const targetTile = tiles.find((tile) => tile.id === tileId);
    if (!targetTile) {
      return;
    }
    const left = targetTile.x * GRID_CONFIG.cellSize;
    const top = targetTile.y * GRID_CONFIG.cellSize;
    const offsetX = event.clientX - rect.left - left;
    const offsetY = event.clientY - rect.top - top;

    setDragState({
      id: tileId,
      offsetX,
      offsetY,
      pointerId: event.pointerId
    });
    onDragStart?.(tileId);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return (
    <div
      ref={boardRef}
      className="grid-board"
      style={{ width: boardWidth, height: boardHeight }}
      onPointerDown={handleBoardPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {tiles.map((tile) => {
        const size = getTileSize(tile);
        const left = tile.x * GRID_CONFIG.cellSize;
        const top = tile.y * GRID_CONFIG.cellSize;
        const isSelected = selectedIds.includes(tile.id);

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
              isSelected={isSelected}
              onPointerDown={(event) => handleTilePointerDown(tile.id, event)}
            />
          </div>
        );
      })}
    </div>
  );
}
