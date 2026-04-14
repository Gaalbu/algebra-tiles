import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridBoard } from '../components/GridBoard';
import { InventoryPanel } from '../components/InventoryPanel';
import { InventoryItem, TileInstance } from '../types/tiles';
import { applyZeroPairs } from '../utils/expression';
import { GRID_CONFIG } from '../utils/grid';
import { nextId } from '../utils/id';
import { detectFactorization } from '../utils/factorization';

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
  const [expressionType, setExpressionType] = useState(EXPRESSION_TYPES[0]);

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

  const gapPreview = factorization.gaps.slice(0, 8);
  const overlapPreview = factorization.overlaps.slice(0, 8);

  return (
    <section className="grid">
      <div className="card">
        <h1>{t('factor.title')}</h1>
        <p>{t('factor.subtitle')}</p>
      </div>

      <div className="panel controls">
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
          <strong>{t('workspace.tools')}</strong>
          <div className="grid">
            <button
              className="btn secondary"
              onClick={handleClear}
            >
              {t('workspace.clear')}
            </button>
            <button
              className="btn secondary"
              onClick={handleZeroPairs}
            >
              {t('workspace.zeroPair')}
            </button>
            <button
              className="btn secondary"
              onClick={handleUndo}
              disabled={history.length === 0}
            >
              {t('workspace.undo')}
            </button>
            <button
              className="btn secondary"
              onClick={handleRedo}
              disabled={future.length === 0}
            >
              {t('workspace.redo')}
            </button>
          </div>
        </div>
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
    </section>
  );
}

function formatCoords(coords: Array<{ x: number; y: number }>) {
  return coords.map((point) => `(${point.x}, ${point.y})`).join(' ');
}
