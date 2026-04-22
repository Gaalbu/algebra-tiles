import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { equationSets } from '../data/equations';
import { INVENTORY_ITEMS } from '../data/tiles';
import { GridBoard } from '../components/GridBoard';
import { InventoryPanel } from '../components/InventoryPanel';
import { ContextMenu } from '../components/ContextMenu';
import { ResultModal } from '../components/ResultModal';
import { useAppStore } from '../store/appStore';
import { InventoryItem, TileInstance } from '../types/tiles';
import {
  applyZeroPairs,
  buildExpression,
  countTiles,
  isMatch
} from '../utils/expression';
import { GRID_CONFIG } from '../utils/grid';
import { nextId } from '../utils/id';
import { expressionTypes } from '../data/expressionTypes';

export function WorkspaceScreen() {
  const { t } = useTranslation();
  const { state } = useAppStore();
  const [tiles, setTiles] = useState<TileInstance[]>([]);
  const tilesRef = useRef<TileInstance[]>(tiles);
  const [history, setHistory] = useState<TileInstance[][]>([]);
  const [future, setFuture] = useState<TileInstance[][]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dragSnapshotRef = useRef<TileInstance[] | null>(null);
  const isDraggingRef = useRef(false);
  const [validation, setValidation] = useState<'idle' | 'success' | 'fail'>(
    'idle'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0
  });

  const selectedSet = equationSets.find(
    (set) => set.id === state.selection.equationSetId
  );
  const selectedDifficulty = selectedSet?.difficulties.find(
    (difficulty) => difficulty.id === state.selection.difficultyId
  );
  const selectedExpressionType = state.selection.expressionTypeId
    ? expressionTypes.find(
        (type) => type.id === state.selection.expressionTypeId
      )
    : undefined;
  const selectedExpressionLabel = selectedExpressionType
    ? t(selectedExpressionType.labelKey)
    : '';

  const inventoryItems = INVENTORY_ITEMS;

  const counts = useMemo(() => countTiles(tiles), [tiles]);
  const expressionText = useMemo(() => buildExpression(counts), [counts]);
  const target = selectedExpressionType?.targets[currentTargetIndex]
    ?? selectedDifficulty?.target;
  const targetText = useMemo(
    () => (target ? buildExpression(target) : '-'),
    [target]
  );

  useEffect(() => {
    tilesRef.current = tiles;
  }, [tiles]);

  useEffect(() => {
    if (!selectedExpressionType) {
      return;
    }
    const count = selectedExpressionType.targets.length;
    if (count === 0) {
      return;
    }
    const nextIndex = Math.floor(Math.random() * count);
    setCurrentTargetIndex(nextIndex);
  }, [selectedExpressionType?.id]);

  const updateTiles = (
    updater: (current: TileInstance[]) => TileInstance[],
    recordHistory = true
  ) => {
    setTiles((current) => {
      const next = updater(current);
      if (next === current) {
        return current;
      }
      if (recordHistory) {
        setHistory((stack) => [...stack, current]);
        setFuture([]);
      }
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
    }, !isDraggingRef.current);
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragSnapshotRef.current = tilesRef.current;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    const snapshot = dragSnapshotRef.current;
    dragSnapshotRef.current = null;
    if (!snapshot) {
      return;
    }
    const current = tilesRef.current;
    if (!didTilesMove(snapshot, current)) {
      return;
    }
    setHistory((stack) => [...stack, snapshot]);
    setFuture([]);
  };

  const handleClear = () => {
    if (tiles.length === 0) {
      return;
    }
    updateTiles(() => []);
    setValidation('idle');
    setSelectedIds([]);
  };

  const handleCheck = () => {
    if (!target) {
      return;
    }
    const nextValidation = isMatch(counts, target) ? 'success' : 'fail';
    setValidation(nextValidation);
    setIsModalOpen(true);
  };

  const handleNextChallenge = () => {
    if (selectedExpressionType && selectedExpressionType.targets.length > 0) {
      const count = selectedExpressionType.targets.length;
      let nextIndex = Math.floor(Math.random() * count);
      if (count > 1) {
        while (nextIndex === currentTargetIndex) {
          nextIndex = Math.floor(Math.random() * count);
        }
      }
      setCurrentTargetIndex(nextIndex);
    }
    handleClear();
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
    },
    {
      id: 'check',
      label: t('workspace.check'),
      onSelect: handleCheck,
      disabled: !target
    }
  ];

  return (
    <section className="grid">
      <div className="card page-header">
        <h1>{t('workspace.title')}</h1>
        <p>{t('workspace.subtitle')}</p>
        <p>
          {selectedExpressionLabel ||
            (selectedSet ? t(selectedSet.titleKey) : '')}
          {selectedDifficulty ? ` / ${t(selectedDifficulty.labelKey)}` : ''}
        </p>
        {selectedExpressionLabel && (
          <div className="selection-chip">
            <strong>{t('workspace.selectedEquation')}</strong> {selectedExpressionLabel}
          </div>
        )}
        <Link className="btn secondary" to="/equations">
          {t('workspace.backToSelection')}
        </Link>
      </div>

      <div className="workspace">
        <div className="panel">
          <strong>{t('workspace.inventory')}</strong>
          <InventoryPanel items={inventoryItems} />
        </div>
        <div className="panel">
          <strong>{t('workspace.grid')}</strong>
          <p className="hint">
            Grid magnetico para arrastar e soltar. Arraste os blocos do
            inventario para adicionar.
          </p>
          <div className="board-wrapper">
            <GridBoard
              tiles={tiles}
              onTileMove={handleMoveTile}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onInventoryDrop={handleAddTile}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onContextMenu={openContextMenu}
            />
          </div>
          <p className="hint">
            {GRID_CONFIG.columns}x{GRID_CONFIG.rows} celulas
          </p>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <strong>{t('workspace.expression')}</strong>
          <p>{expressionText}</p>
          <p className="hint">
            {t('workspace.target')}: {targetText}
          </p>
          {validation !== 'idle' && (
            <div className={`result ${validation}`}>
              {t(`validation.${validation}`)}
            </div>
          )}
        </div>
      </div>
      <ResultModal
        isOpen={isModalOpen && validation !== 'idle'}
        title={t(`validation.title.${validation}`)}
        message={t(`validation.${validation}`)}
        primaryLabel={
          validation === 'success'
            ? t('validation.primarySuccess')
            : t('validation.primaryFail')
        }
        secondaryLabel={validation === 'success' ? t('validation.keep') : ''}
        onSecondary={() => setIsModalOpen(false)}
        onPrimary={() => {
          setIsModalOpen(false);
          if (validation === 'success') {
            handleNextChallenge();
          }
        }}
      />
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

function didTilesMove(previous: TileInstance[], current: TileInstance[]) {
  if (previous.length !== current.length) {
    return true;
  }
  const byId = new Map(previous.map((tile) => [tile.id, tile]));
  for (const tile of current) {
    const prev = byId.get(tile.id);
    if (!prev) {
      return true;
    }
    if (prev.x !== tile.x || prev.y !== tile.y) {
      return true;
    }
  }
  return false;
}
