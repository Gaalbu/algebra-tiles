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
import { GRID_CONFIG, VARIABLE_LENGTH } from '../utils/grid';
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

export function FactorScreen() {
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
  const [factorLabel, setFactorLabel] = useState('');
  const [factorError, setFactorError] = useState('');

  const inventoryItems = useMemo<InventoryItem[]>(
    () => [
      { kind: 'x2', sign: 1, label: '+x^2' },
      { kind: 'x2', sign: -1, label: '-x^2' },
      { kind: 'x', sign: 1, label: '+x' },
      { kind: 'x', sign: -1, label: '-x' },
      { kind: '1', sign: 1, label: '+1' },
      { kind: '1', sign: -1, label: '-1' }
    ],
    []
  );

  const counts = useMemo(() => countTiles(tiles), [tiles]);
  const expressionText = useMemo(() => buildExpression(counts), [counts]);

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
      setFactorLabel('');
      setFactorError('');
      return;
    }
    const parsed = parseExpression(expressionInput);
    if (parsed.error) {
      setTiles([]);
      setSelectedIds([]);
      setFactorLabel('');
      setFactorError(t('expression.invalid'));
      return;
    }

    const factorResult = factorCounts(parsed.counts);
    if (!factorResult) {
      setTiles([]);
      setSelectedIds([]);
      setFactorLabel('');
      setFactorError(t('factor.invalid'));
      return;
    }

    setFactorError('');
    setFactorLabel(`(x + ${factorResult.m}) (x + ${factorResult.n})`);
    const arranged = buildFactorTiles(factorResult.m, factorResult.n);
    setTiles(arranged);
    setSelectedIds([]);
  }, [showSolution, expressionInput, t]);

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

  const handleAddTile = (item: InventoryItem) => {
    updateTiles((current) => [
      ...current,
      {
        id: nextId('tile'),
        kind: item.kind,
        sign: item.sign,
        x: 0,
        y: 0
      }
    ]);
  };

  const handleMoveTile = (id: string, x: number, y: number) => {
    updateTiles((current) =>
      current.map((tile) => (tile.id === id ? { ...tile, x, y } : tile))
    );
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

  return (
    <section className="grid">
      <div className="card">
        <h1>{t('factor.title')}</h1>
        <p>{t('factor.subtitle')}</p>
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
          {factorError && <span className="error-text">{factorError}</span>}
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <strong>{t('workspace.inventory')}</strong>
          <InventoryPanel
            items={inventoryItems}
            onAdd={handleAddTile}
            disabled={showSolution}
          />
        </div>
        <div className="panel">
          <strong>{t('factor.gridLabel')}</strong>
          <div className="board-wrapper">
            <GridBoard
              tiles={tiles}
              onTileMove={handleMoveTile}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              isInteractive={!showSolution}
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
          <strong>{t('factor.resultLabel')}</strong>
          <p>{expressionText}</p>
          {factorLabel && <p className="hint">{factorLabel}</p>}
        </div>
      </div>
    </section>
  );
}

function factorCounts(counts: { x2: number; x: number; one: number }) {
  if (counts.x2 !== 1 || counts.x < 0 || counts.one < 0) {
    return null;
  }

  if (counts.one === 0) {
    return { m: 0, n: counts.x };
  }

  for (let m = 0; m <= counts.one; m += 1) {
    const n = counts.x - m;
    if (m * n === counts.one && n >= 0) {
      return { m, n };
    }
  }

  return null;
}

function buildFactorTiles(m: number, n: number) {
  const tiles: TileInstance[] = [];
  tiles.push({
    id: nextId('tile'),
    kind: 'x2',
    sign: 1,
    x: 0,
    y: 0
  });

  for (let col = 0; col < m; col += 1) {
    tiles.push({
      id: nextId('tile'),
      kind: 'x',
      sign: 1,
      orientation: 'vertical',
      x: VARIABLE_LENGTH + col,
      y: 0
    });
  }

  for (let row = 0; row < n; row += 1) {
    tiles.push({
      id: nextId('tile'),
      kind: 'x',
      sign: 1,
      orientation: 'horizontal',
      x: 0,
      y: VARIABLE_LENGTH + row
    });
  }

  for (let row = 0; row < n; row += 1) {
    for (let col = 0; col < m; col += 1) {
      tiles.push({
        id: nextId('tile'),
        kind: '1',
        sign: 1,
        x: VARIABLE_LENGTH + col,
        y: VARIABLE_LENGTH + row
      });
    }
  }

  return tiles;
}
