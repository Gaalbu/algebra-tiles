import { useTranslation } from 'react-i18next';
import { equationSets } from '../data/equations';
import { useAppStore } from '../store/appStore';

export function WorkspaceScreen() {
  const { t } = useTranslation();
  const { state } = useAppStore();

  const selectedSet = equationSets.find(
    (set) => set.id === state.selection.equationSetId
  );
  const selectedDifficulty = selectedSet?.difficulties.find(
    (difficulty) => difficulty.id === state.selection.difficultyId
  );

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
          <p>Tiles: x^2, x, 1 (positivo e negativo).</p>
        </div>
        <div className="panel">
          <strong>{t('workspace.grid')}</strong>
          <p>Grid magnetico para arrastar e soltar.</p>
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
