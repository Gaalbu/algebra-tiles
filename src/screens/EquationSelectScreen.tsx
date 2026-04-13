import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { equationSets } from '../data/equations';
import { useAppStore } from '../store/appStore';

export function EquationSelectScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useAppStore();

  return (
    <section className="grid two">
      <div className="card">
        <h1>{t('equations.title')}</h1>
        <p>{t('equations.subtitle')}</p>
      </div>
      {equationSets.map((set) => (
        <div className="card" key={set.id}>
          <h2>{t(set.titleKey)}</h2>
          <p>{t(set.descriptionKey)}</p>
          <button
            className="btn"
            onClick={() => {
              dispatch({
                type: 'selectEquationSet',
                payload: { equationSetId: set.id }
              });
              navigate('/difficulty');
            }}
          >
            {t('actions.select')}
          </button>
        </div>
      ))}
    </section>
  );
}
