import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { expressionTypes } from '../data/expressionTypes';

export function EquationSelectScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useAppStore();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <section className="grid two">
      <div className="card page-header">
        <h1>{t('equations.title')}</h1>
        <p>{t('equations.subtitle')}</p>
        {selectedType && (
          <p className="hint">
            {t('equations.selected')} {t(`expressionTypes.${selectedType}`)}
          </p>
        )}
      </div>
      {expressionTypes.map((type) => (
        <div className="card" key={type.id}>
          <h2>{t(type.labelKey)}</h2>
          <p>{t(type.descriptionKey)}</p>
          <button
            className="btn"
            onClick={() => {
              setSelectedType(type.id);
              dispatch({
                type: 'selectExpressionType',
                payload: { expressionTypeId: type.id }
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
