import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridBoard } from '../components/GridBoard';
import { InventoryPanel } from '../components/InventoryPanel';
import { ContextMenu } from '../components/ContextMenu';
import { INVENTORY_ITEMS } from '../data/tiles';
import { InventoryItem, TileInstance } from '../types/tiles';
import {
  applyZeroPairs,
  buildExpression,
  countTiles,
  parseExpression
} from '../utils/expression';
import { clamp, getTileSize, GRID_CONFIG, layoutTiles } from '../utils/grid';
import { nextId } from '../utils/id';

type TilePairState = {
  left: TileInstance[];
  right: TileInstance[];
};

export function SolveScreen() {
  const { t } = useTranslation();
  const [leftTiles, setLeftTiles] = useState<TileInstance[]>([]);
  const [rightTiles, setRightTiles] = useState<TileInstance[]>([]);
  const [history, setHistory] = useState<TilePairState[]>([]);
  const [future, setFuture] = useState<TilePairState[]>([]);
  const [selectedLeftIds, setSelectedLeftIds] = useState<string[]>([]);
  const [selectedRightIds, setSelectedRightIds] = useState<string[]>([]);
  const [expressionInput, setExpressionInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [manualSnapshot, setManualSnapshot] = useState<TilePairState | null>(
    null
  );
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0
  });

  const inventoryItems = INVENTORY_ITEMS;

  const leftCounts = useMemo(() => countTiles(leftTiles), [leftTiles]);
  const rightCounts = useMemo(() => countTiles(rightTiles), [rightTiles]);
  const leftExpression = useMemo(
    () => buildExpression(leftCounts),
    [leftCounts]
  );
  const rightExpression = useMemo(
    () => buildExpression(rightCounts),
    [rightCounts]
  );

  const parseResult = useMemo(() => {
    if (!showSolution) {
      return null;
    }
    const parts = expressionInput.split('=');
    const leftText = parts[0]?.trim() ?? '';
    const rightText = parts[1]?.trim() ?? '';
    const leftParsed = parseExpression(leftText);
    const rightParsed = parseExpression(rightText);
    const error = leftParsed.error || rightParsed.error ? 'invalid' : undefined;
    return {
      left: leftParsed,
      right: rightParsed,
      error
    };
  }, [showSolution, expressionInput]);

  const updatePairTiles = (
    updater: (current: TilePairState) => TilePairState
  ) => {
    if (showSolution) {
      return;
    }
    const currentState = { left: leftTiles, right: rightTiles };
    const next = updater(currentState);
    if (next.left === leftTiles && next.right === rightTiles) {
      return;
    }
    setHistory((stack) => [...stack, currentState]);
    setFuture([]);
    setLeftTiles(next.left);
    setRightTiles(next.right);
  };

  useEffect(() => {
    if (!showSolution) {
      return;
    }
    const parts = expressionInput.split('=');
    const leftText = parts[0]?.trim() ?? '';
    const rightText = parts[1]?.trim() ?? '';
    const leftParsed = parseExpression(leftText);
    const rightParsed = parseExpression(rightText);

    if (leftParsed.error || rightParsed.error) {
      setLeftTiles([]);
      setRightTiles([]);
      setSelectedLeftIds([]);
      setSelectedRightIds([]);
      return;
    }

    setLeftTiles(layoutTiles(buildTiles(leftParsed.counts), GRID_CONFIG.columns));
    setRightTiles(
      layoutTiles(buildTiles(rightParsed.counts), GRID_CONFIG.columns)
    );
    setSelectedLeftIds([]);
    setSelectedRightIds([]);
  }, [showSolution, expressionInput]);

  const handleToggleSolution = () => {
    setShowSolution((current) => {
      if (current) {
        setLeftTiles(manualSnapshot?.left ?? []);
        setRightTiles(manualSnapshot?.right ?? []);
        setSelectedLeftIds([]);
        setSelectedRightIds([]);
        return false;
      }
      setManualSnapshot({ left: leftTiles, right: rightTiles });
      return true;
    });
  };

  const handleAddTile = (item: InventoryItem, x = 0, y = 0) => {
    updatePairTiles((current) => ({
      left: [
        ...current.left,
        { id: nextId('tile'), kind: item.kind, sign: item.sign, x, y }
      ],
      right: [
        ...current.right,
        { id: nextId('tile'), kind: item.kind, sign: item.sign, x, y }
      ]
    }));
  };

  const handleMoveLeftTile = (id: string, x: number, y: number) => {
    updatePairTiles((current) => ({
      left: current.left.map((tile) => {
        if (tile.id !== id) {
          return tile;
        }
        if (tile.x === x && tile.y === y) {
          return tile;
        }
        return { ...tile, x, y };
      }),
      right: current.right
    }));
  };

  const handleMoveRightTile = (id: string, x: number, y: number) => {
    updatePairTiles((current) => ({
      left: current.left,
      right: current.right.map((tile) => {
        if (tile.id !== id) {
          return tile;
        }
        if (tile.x === x && tile.y === y) {
          return tile;
        }
        return { ...tile, x, y };
      })
    }));
  };

  const handleClear = () => {
    if (showSolution) {
      return;
    }
    updatePairTiles(() => ({ left: [], right: [] }));
    setSelectedLeftIds([]);
    setSelectedRightIds([]);
  };

  const handleUndo = () => {
    if (history.length === 0 || showSolution) {
      return;
    }
    const previous = history[history.length - 1];
    setHistory((current) => current.slice(0, -1));
    setFuture((current) => [...current, { left: leftTiles, right: rightTiles }]);
    setLeftTiles(previous.left);
    setRightTiles(previous.right);
    setSelectedLeftIds([]);
    setSelectedRightIds([]);
  };

  const handleRedo = () => {
    if (future.length === 0 || showSolution) {
      return;
    }
    const next = future[future.length - 1];
    setFuture((current) => current.slice(0, -1));
    setHistory((current) => [...current, { left: leftTiles, right: rightTiles }]);
    setLeftTiles(next.left);
    setRightTiles(next.right);
    setSelectedLeftIds([]);
    setSelectedRightIds([]);
  };

  const handleZeroPairs = () => {
    if (showSolution) {
      return;
    }
    updatePairTiles((current) => ({
      left: applyZeroPairs(current.left, selectedLeftIds),
      right: applyZeroPairs(current.right, selectedRightIds)
    }));
    setSelectedLeftIds([]);
    setSelectedRightIds([]);
  };

  const handleDeleteSelected = () => {
    if (showSolution) {
      return;
    }
    const leftSet = new Set(selectedLeftIds);
    const rightSet = new Set(selectedRightIds);
    updatePairTiles((current) => ({
      left: current.left.filter((tile) => !leftSet.has(tile.id)),
      right: current.right.filter((tile) => !rightSet.has(tile.id))
    }));
    setSelectedLeftIds([]);
    setSelectedRightIds([]);
  };

  const handleRotateSelected = () => {
    if (showSolution) {
      return;
    }
    const leftSet = new Set(selectedLeftIds);
    const rightSet = new Set(selectedRightIds);
    updatePairTiles((current) => ({
      left: current.left.map((tile) => rotateTileIfNeeded(tile, leftSet)),
      right: current.right.map((tile) => rotateTileIfNeeded(tile, rightSet))
    }));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showSolution || event.key.toLowerCase() !== 'r') {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }
      if (selectedLeftIds.length === 0 && selectedRightIds.length === 0) {
        return;
      }
      event.preventDefault();
      handleRotateSelected();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSolution, selectedLeftIds, selectedRightIds]);

  const openContextMenu = (position: { x: number; y: number }) => {
    if (showSolution) {
      return;
    }
    setContextMenu({ isOpen: true, x: position.x, y: position.y });
  };

  const closeContextMenu = () => {
    setContextMenu((current) => ({ ...current, isOpen: false }));
  };

  const hasSelection =
    selectedLeftIds.length > 0 || selectedRightIds.length > 0;

  const contextMenuItems = [
    {
      id: 'clear',
      label: t('workspace.clear'),
      onSelect: handleClear,
      disabled: showSolution
    },
    {
      id: 'zero-pair',
      label: t('workspace.zeroPair'),
      onSelect: handleZeroPairs,
      disabled: showSolution || !hasSelection
    },
    {
      id: 'rotate',
      label: t('workspace.rotate'),
      onSelect: handleRotateSelected,
      disabled:
        showSolution ||
        ![
          ...selectedLeftIds.map((id) => leftTiles.find((tile) => tile.id === id)),
          ...selectedRightIds.map((id) => rightTiles.find((tile) => tile.id === id))
        ].some((tile) => tile?.kind === 'x')
    },
    {
      id: 'delete',
      label: t('workspace.deleteSelected'),
      onSelect: handleDeleteSelected,
      disabled: showSolution || !hasSelection
    },
    {
      id: 'undo',
      label: t('workspace.undo'),
      onSelect: handleUndo,
      disabled: showSolution || history.length === 0
    },
    {
      id: 'redo',
      label: t('workspace.redo'),
      onSelect: handleRedo,
      disabled: showSolution || future.length === 0
    }
  ];

  const parseError =
    showSolution && parseResult?.error ? t('expression.invalid') : '';

  return (
    <section className="grid">
      <div className="card page-header">
        <h1>{t('solve.title')}</h1>
        <p>{t('solve.subtitle')}</p>
      </div>

      <div className="panel controls">
        <div className="controls-row">
          <input
            className="input"
            value={expressionInput}
            onChange={(event) => setExpressionInput(event.target.value)}
            placeholder={t('solve.placeholder')}
          />
          <label className="toggle">
            <input
              type="checkbox"
              checked={showSolution}
              onChange={handleToggleSolution}
            />
            <span>{t('expression.showSolution')}</span>
          </label>
        </div>
        <div className="controls-row">
          {parseError && <span className="error-text">{parseError}</span>}
        </div>
      </div>

      <div className="workspace solve-workspace">
        <div className="panel">
          <strong>{t('workspace.inventory')}</strong>
          <InventoryPanel items={inventoryItems} disabled={showSolution} />
        </div>
        <div className="solve-boards">
          <div className="panel">
            <strong>{t('solve.leftSide')}</strong>
            <div className="board-wrapper">
              <GridBoard
                tiles={leftTiles}
                onTileMove={handleMoveLeftTile}
                selectedIds={selectedLeftIds}
                onSelectionChange={setSelectedLeftIds}
                isInteractive={!showSolution}
                onInventoryDrop={showSolution ? undefined : handleAddTile}
                onContextMenu={openContextMenu}
              />
            </div>
          </div>
          <div className="solve-divider">=</div>
          <div className="panel">
            <strong>{t('solve.rightSide')}</strong>
            <div className="board-wrapper">
              <GridBoard
                tiles={rightTiles}
                onTileMove={handleMoveRightTile}
                selectedIds={selectedRightIds}
                onSelectionChange={setSelectedRightIds}
                isInteractive={!showSolution}
                onInventoryDrop={showSolution ? undefined : handleAddTile}
                onContextMenu={openContextMenu}
              />
            </div>
          </div>
        </div>
      </div>

        <div className="grid two">
          <div className="panel">
            <strong>{t('solve.summary')}</strong>
            <p>
              {leftExpression} = {rightExpression}
            </p>
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

function buildTiles(counts: { x2: number; x: number; one: number }) {
  const tiles: TileInstance[] = [];
  const pushTiles = (
    kind: 'x2' | 'x' | '1',
    value: number,
    sign: 1 | -1
  ) => {
    for (let i = 0; i < value; i += 1) {
      tiles.push({
        id: nextId('tile'),
        kind,
        sign,
        x: 0,
        y: 0
      });
    }
  };

  pushTiles('x2', Math.abs(counts.x2), counts.x2 >= 0 ? 1 : -1);
  pushTiles('x', Math.abs(counts.x), counts.x >= 0 ? 1 : -1);
  pushTiles('1', Math.abs(counts.one), counts.one >= 0 ? 1 : -1);

  return tiles;
}

function rotateTileIfNeeded(tile: TileInstance, selectedIds: Set<string>) {
  if (!selectedIds.has(tile.id) || tile.kind !== 'x') {
    return tile;
  }
  const nextOrientation: TileInstance['orientation'] =
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
}
