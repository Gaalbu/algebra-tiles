import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { equationSets } from '../data/equations';
import { useAppStore } from '../store/appStore';

export function DifficultySelectScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, dispatch } = useAppStore();

  const selectedSet = equationSets.find(
    (set) => set.id === state.selection.equationSetId
  );

  if (!selectedSet) {
    return (
      <section className="card">
        <h1>{t('difficulty.title')}</h1>
        <p>{t('equations.subtitle')}</p>
        <button className="btn" onClick={() => navigate('/equations')}>
          {t('actions.back')}
        </button>
      </section>
    );
  }

  return (
    <section className="grid two">
      <div className="card">
        <h1>{t('difficulty.title')}</h1>
        <p>{t('difficulty.subtitle')}</p>
      </div>
      {selectedSet.difficulties.map((difficulty) => (
        <div className="card" key={difficulty.id}>
          <h2>{t(difficulty.labelKey)}</h2>
          <p>{t(difficulty.descriptionKey)}</p>
          <button
            className="btn"
            onClick={() => {
              dispatch({
                type: 'selectDifficulty',
                payload: { difficultyId: difficulty.id }
              });
              navigate('/workspace');
            }}
          >
            {t('actions.select')}
          </button>
        </div>
      ))}
    </section>
  );
}
