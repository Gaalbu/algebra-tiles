import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridBoard } from '../components/GridBoard';
import { InventoryPanel } from '../components/InventoryPanel';
import { ContextMenu } from '../components/ContextMenu';
import { INVENTORY_ITEMS } from '../data/tiles';
import { InventoryItem, TileInstance } from '../types/tiles';
import { applyZeroPairs } from '../utils/expression';
import { clamp, getTileSize, GRID_CONFIG } from '../utils/grid';
import { nextId } from '../utils/id';
import { detectFactorization } from '../utils/factorization';

export function FactorScreen() {
  const { t } = useTranslation();
  const [tiles, setTiles] = useState<TileInstance[]>([]);
  const [history, setHistory] = useState<TileInstance[][]>([]);
  const [future, setFuture] = useState<TileInstance[][]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0
  });

  const inventoryItems = INVENTORY_ITEMS;

  const factorization = useMemo(() => detectFactorization(tiles), [tiles]);

  const updateTiles = (
    updater: (current: TileInstance[]) => TileInstance[]
  ) => {
    setTiles((current) => {
      const next = updater(current);
      if (next === current) {
        return current;
      }
      setHistory((stack) => [...stack, current]);
      setFuture([]);
      return next;
    });
  };

  const handleAddTile = (item: InventoryItem, x = 0, y = 0) => {
    updateTiles((current) => [
      ...current,
      {
        id: nextId('tile'),
        kind: item.kind,
        sign: item.sign,
        x,
        y
      }
    ]);
  };

  const handleMoveTile = (id: string, x: number, y: number) => {
    updateTiles((current) => {
      const target = current.find((tile) => tile.id === id);
      if (!target || (target.x === x && target.y === y)) {
        return current;
      }
      return current.map((tile) =>
        tile.id === id ? { ...tile, x, y } : tile
      );
    });
  };

  const handleClear = () => {
    if (tiles.length === 0) {
      return;
    }
    updateTiles(() => []);
    setSelectedIds([]);
  };

  const handleUndo = () => {
    if (history.length === 0) {
      return;
    }
    const previous = history[history.length - 1];
    setHistory((current) => current.slice(0, -1));
    setFuture((current) => [...current, tiles]);
    setTiles(previous);
    setSelectedIds([]);
  };

  const handleRedo = () => {
    if (future.length === 0) {
      return;
    }
    const next = future[future.length - 1];
    setFuture((current) => current.slice(0, -1));
    setHistory((current) => [...current, tiles]);
    setTiles(next);
    setSelectedIds([]);
  };

  const handleZeroPairs = () => {
    updateTiles((current) => applyZeroPairs(current, selectedIds));
    setSelectedIds([]);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }
    const selected = new Set(selectedIds);
    updateTiles((current) => current.filter((tile) => !selected.has(tile.id)));
    setSelectedIds([]);
  };

  const handleRotateSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }
    updateTiles((current) =>
      current.map((tile) => {
        if (!selectedIds.includes(tile.id) || tile.kind !== 'x') {
          return tile;
        }
        const nextOrientation =
          tile.orientation === 'vertical' ? 'horizontal' : 'vertical';
        const size = getTileSize({ kind: tile.kind, orientation: nextOrientation });
        const maxX = GRID_CONFIG.columns - size.width;
        const maxY = GRID_CONFIG.rows - size.height;
        return {
          ...tile,
          orientation: nextOrientation,
          x: clamp(tile.x, 0, maxX),
          y: clamp(tile.y, 0, maxY)
        };
      })
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'r') {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }
      if (selectedIds.length === 0) {
        return;
      }
      event.preventDefault();
      handleRotateSelected();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds]);

  const openContextMenu = (position: { x: number; y: number }) => {
    setContextMenu({ isOpen: true, x: position.x, y: position.y });
  };

  const closeContextMenu = () => {
    setContextMenu((current) => ({ ...current, isOpen: false }));
  };

  const contextMenuItems = [
    {
      id: 'clear',
      label: t('workspace.clear'),
      onSelect: handleClear,
      disabled: tiles.length === 0
    },
    {
      id: 'zero-pair',
      label: t('workspace.zeroPair'),
      onSelect: handleZeroPairs,
      disabled: selectedIds.length === 0
    },
    {
      id: 'rotate',
      label: t('workspace.rotate'),
      onSelect: handleRotateSelected,
      disabled: !selectedIds.some((id) => {
        const tile = tiles.find((item) => item.id === id);
        return tile?.kind === 'x';
      })
    },
    {
      id: 'delete',
      label: t('workspace.deleteSelected'),
      onSelect: handleDeleteSelected,
      disabled: selectedIds.length === 0
    },
    {
      id: 'undo',
      label: t('workspace.undo'),
      onSelect: handleUndo,
      disabled: history.length === 0
    },
    {
      id: 'redo',
      label: t('workspace.redo'),
      onSelect: handleRedo,
      disabled: future.length === 0
    }
  ];

  const gapPreview = factorization.gaps.slice(0, 8);
  const overlapPreview = factorization.overlaps.slice(0, 8);

  return (
    <section className="grid">
      <div className="card page-header">
        <h1>{t('factor.title')}</h1>
        <p>{t('factor.subtitle')}</p>
      </div>

      <div className="panel controls">
        <div className="controls-row">
          <span className="hint">{t('factor.autoHint')}</span>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <strong>{t('workspace.inventory')}</strong>
          <InventoryPanel items={inventoryItems} />
        </div>
        <div className="panel">
          <strong>{t('factor.gridLabel')}</strong>
          <div className="factor-board-layout">
            <div className="factor-axis" />
            <div className="factor-axis x-axis">
              {factorization.factors?.[0] ?? '-'}
            </div>
            <div className="factor-axis y-axis">
              {factorization.factors?.[1] ?? '-'}
            </div>
            <div className="board-wrapper">
              <GridBoard
                tiles={tiles}
                onTileMove={handleMoveTile}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onInventoryDrop={handleAddTile}
                onContextMenu={openContextMenu}
              />
            </div>
          </div>
          <p className="hint">
            {GRID_CONFIG.columns}x{GRID_CONFIG.rows} celulas
          </p>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <strong>{t('factor.resultLabel')}</strong>
          {factorization.isRect && factorization.factors ? (
            <p className="factor-status success">
              {t('factor.valid')} ({factorization.factors[0]}) {t('factor.times')}{' '}
              ({factorization.factors[1]})
            </p>
          ) : (
            <div className="factor-status">
              <p className="error-text">{t('factor.invalid')}</p>
              <p className="hint">
                {t('factor.gaps')}: {factorization.gaps.length} |{' '}
                {t('factor.overlaps')}: {factorization.overlaps.length}
              </p>
              {gapPreview.length > 0 && (
                <p className="factor-coords">
                  {t('factor.gapSample')}: {formatCoords(gapPreview)}
                </p>
              )}
              {overlapPreview.length > 0 && (
                <p className="factor-coords">
                  {t('factor.overlapSample')}: {formatCoords(overlapPreview)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <ContextMenu
        isOpen={contextMenu.isOpen}
        x={contextMenu.x}
        y={contextMenu.y}
        items={contextMenuItems}
        onClose={closeContextMenu}
      />
    </section>
  );
}

function formatCoords(coords: Array<{ x: number; y: number }>) {
  return coords.map((point) => `(${point.x}, ${point.y})`).join(' ');
}
