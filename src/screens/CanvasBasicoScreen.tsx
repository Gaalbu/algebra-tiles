import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridBoard } from '../components/GridBoard';
import { InventoryPanel } from '../components/InventoryPanel';
import { InventoryItem, TileInstance } from '../types/tiles';
import {
  applyZeroPairs,
  buildExpression,
  countTiles,
  parseExpression
} from '../utils/expression';
import { GRID_CONFIG, layoutTiles } from '../utils/grid';
import { nextId } from '../utils/id';

const EXPRESSION_TYPES = [
  'integers',
  'zeroPairs',
  'simpleEquations',
  'twoSideEquations',
  'likeTerms',
  'distributive',
  'areaProducts',
  'binomialMultiplication',
  'perfectSquare',
  'completeSquare'
];

export function CanvasBasicoScreen() {
  const { t } = useTranslation();
  const [tiles, setTiles] = useState<TileInstance[]>([]);
  const [history, setHistory] = useState<TileInstance[][]>([]);
  const [future, setFuture] = useState<TileInstance[][]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expressionInput, setExpressionInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [manualSnapshot, setManualSnapshot] = useState<TileInstance[] | null>(
    null
  );
  const [expressionType, setExpressionType] = useState(EXPRESSION_TYPES[0]);

  const inventoryItems = useMemo<InventoryItem[]>(
    () => [
      { kind: 'x2', sign: 1, label: '+x²' },
      { kind: 'x2', sign: -1, label: '-x²' },
      { kind: 'x', sign: 1, label: '+x' },
      { kind: 'x', sign: -1, label: '-x' },
      { kind: '1', sign: 1, label: '+1' },
      { kind: '1', sign: -1, label: '-1' }
    ],
    []
  );

  const counts = useMemo(() => countTiles(tiles), [tiles]);
  const expressionText = useMemo(() => buildExpression(counts), [counts]);

  const parseResult = useMemo(
    () => (showSolution ? parseExpression(expressionInput) : null),
    [showSolution, expressionInput]
  );

  const updateTiles = (
    updater: (current: TileInstance[]) => TileInstance[]
  ) => {
    if (showSolution) {
      return;
    }
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

  useEffect(() => {
    if (!showSolution) {
      return;
    }
    const parsed = parseExpression(expressionInput);
    if (parsed.error) {
      setTiles([]);
      setSelectedIds([]);
      return;
    }
    const generated = layoutTiles(
      buildTiles(parsed.counts),
      GRID_CONFIG.columns
    );
    setTiles(generated);
    setSelectedIds([]);
  }, [showSolution, expressionInput]);

  const handleToggleSolution = () => {
    setShowSolution((current) => {
      if (current) {
        setTiles(manualSnapshot ?? []);
        setSelectedIds([]);
        return false;
      }
      setManualSnapshot(tiles);
      return true;
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
    if (tiles.length === 0 || showSolution) {
      return;
    }
    updateTiles(() => []);
    setSelectedIds([]);
  };

  const handleUndo = () => {
    if (history.length === 0 || showSolution) {
      return;
    }
    const previous = history[history.length - 1];
    setHistory((current) => current.slice(0, -1));
    setFuture((current) => [...current, tiles]);
    setTiles(previous);
    setSelectedIds([]);
  };

  const handleRedo = () => {
    if (future.length === 0 || showSolution) {
      return;
    }
    const next = future[future.length - 1];
    setFuture((current) => current.slice(0, -1));
    setHistory((current) => [...current, tiles]);
    setTiles(next);
    setSelectedIds([]);
  };

  const handleZeroPairs = () => {
    if (showSolution) {
      return;
    }
    updateTiles((current) => applyZeroPairs(current, selectedIds));
    setSelectedIds([]);
  };

  const handleDeleteSelected = () => {
    if (showSolution || selectedIds.length === 0) {
      return;
    }
    const selected = new Set(selectedIds);
    updateTiles((current) => current.filter((tile) => !selected.has(tile.id)));
    setSelectedIds([]);
  };

  const parseError =
    showSolution && parseResult?.error ? t('expression.invalid') : '';

  return (
    <section className="grid">
      <div className="card">
        <h1>{t('canvasBasico.title')}</h1>
        <p>{t('canvasBasico.subtitle')}</p>
      </div>

      <div className="panel controls">
        <div className="controls-row">
          <input
            className="input"
            value={expressionInput}
            onChange={(event) => setExpressionInput(event.target.value)}
            placeholder={t('expression.placeholder')}
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
          <label className="select-label">
            {t('expression.typeLabel')}
            <select
              className="select"
              value={expressionType}
              onChange={(event) => setExpressionType(event.target.value)}
            >
              {EXPRESSION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`expressionTypes.${type}`)}
                </option>
              ))}
            </select>
          </label>
          {parseError && <span className="error-text">{parseError}</span>}
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <strong>{t('workspace.inventory')}</strong>
          <InventoryPanel items={inventoryItems} disabled={showSolution} />
        </div>
        <div className="panel">
          <strong>{t('workspace.grid')}</strong>
          <div className="board-wrapper">
            <GridBoard
              tiles={tiles}
              onTileMove={handleMoveTile}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              isInteractive={!showSolution}
              onInventoryDrop={showSolution ? undefined : handleAddTile}
            />
          </div>
          <p className="hint">
            {GRID_CONFIG.columns}x{GRID_CONFIG.rows} celulas
          </p>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <strong>{t('workspace.tools')}</strong>
          <div className="grid">
            <button
              className="btn secondary"
              onClick={handleClear}
              disabled={showSolution}
            >
              {t('workspace.clear')}
            </button>
            <button
              className="btn secondary"
              onClick={handleZeroPairs}
              disabled={showSolution}
            >
              {t('workspace.zeroPair')}
            </button>
            <button
              className="btn secondary"
              onClick={handleDeleteSelected}
              disabled={showSolution || selectedIds.length === 0}
            >
              {t('workspace.deleteSelected')}
            </button>
            <button
              className="btn secondary"
              onClick={handleUndo}
              disabled={history.length === 0 || showSolution}
            >
              {t('workspace.undo')}
            </button>
            <button
              className="btn secondary"
              onClick={handleRedo}
              disabled={future.length === 0 || showSolution}
            >
              {t('workspace.redo')}
            </button>
          </div>
        </div>
        <div className="panel">
          <strong>{t('workspace.expression')}</strong>
          <p>{expressionText}</p>
        </div>
      </div>
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
