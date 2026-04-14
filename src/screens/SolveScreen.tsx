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

  const parseError =
    showSolution && parseResult?.error ? t('expression.invalid') : '';

  return (
    <section className="grid">
      <div className="card">
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
              />
            </div>
          </div>
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
          <strong>{t('solve.summary')}</strong>
          <p>
            {leftExpression} = {rightExpression}
          </p>
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
