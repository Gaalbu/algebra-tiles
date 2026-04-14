import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export function EquationSelectScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useAppStore();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const expressionTypes = [
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

  return (
    <section className="grid two">
      <div className="card">
        <h1>{t('equations.title')}</h1>
        <p>{t('equations.subtitle')}</p>
        {selectedType && (
          <p className="hint">
            {t('equations.selected')} {t(`expressionTypes.${selectedType}`)}
          </p>
        )}
      </div>
      {expressionTypes.map((type) => (
        <div className="card" key={type}>
          <h2>{t(`expressionTypes.${type}`)}</h2>
          <button
            className="btn"
            onClick={() => {
              setSelectedType(type);
              dispatch({
                type: 'selectExpressionType',
                payload: { expressionTypeId: type }
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
