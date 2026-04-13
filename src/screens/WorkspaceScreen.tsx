import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { equationSets } from '../data/equations';
import { GridBoard } from '../components/GridBoard';
import { InventoryPanel } from '../components/InventoryPanel';
import { useAppStore } from '../store/appStore';
import { InventoryItem, TileInstance } from '../types/tiles';
import { GRID_CONFIG } from '../utils/grid';
import { nextId } from '../utils/id';

export function WorkspaceScreen() {
  const { t } = useTranslation();
  const { state } = useAppStore();
  const [tiles, setTiles] = useState<TileInstance[]>([]);

  const selectedSet = equationSets.find(
    (set) => set.id === state.selection.equationSetId
  );
  const selectedDifficulty = selectedSet?.difficulties.find(
    (difficulty) => difficulty.id === state.selection.difficultyId
  );

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

  const handleAddTile = (item: InventoryItem) => {
    setTiles((current) => [
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
    setTiles((current) =>
      current.map((tile) => (tile.id === id ? { ...tile, x, y } : tile))
    );
  };

  return (
    <section className="grid">
      <div className="card">
        <h1>{t('workspace.title')}</h1>
        <p>{t('workspace.subtitle')}</p>
        <p>
          {selectedSet ? t(selectedSet.titleKey) : ''} /{' '}
          {selectedDifficulty ? t(selectedDifficulty.labelKey) : ''}
        </p>
      </div>

      <div className="workspace">
        <div className="panel">
          <strong>{t('workspace.inventory')}</strong>
          <InventoryPanel items={inventoryItems} onAdd={handleAddTile} />
        </div>
        <div className="panel">
          <strong>{t('workspace.grid')}</strong>
          <p className="hint">
            Grid magnetico para arrastar e soltar. Clique nos blocos do
            inventario para adicionar.
          </p>
          <div className="board-wrapper">
            <GridBoard tiles={tiles} onTileMove={handleMoveTile} />
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
            <button className="btn secondary">
              {t('workspace.clear')}
            </button>
            <button className="btn secondary">{t('workspace.undo')}</button>
            <button className="btn secondary">{t('workspace.redo')}</button>
            <button className="btn">{t('workspace.check')}</button>
          </div>
        </div>
        <div className="panel">
          <strong>{t('workspace.expression')}</strong>
          <p>2x^2 + 3x - 1</p>
        </div>
      </div>
    </section>
  );
}
