import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const modeCards = [
  { titleKey: 'home.canvasBasicoTitle', descKey: 'home.canvasBasicoDesc', to: '/canvas-basico' },
  { titleKey: 'home.solveTitle', descKey: 'home.solveDesc', to: '/solve' },
  { titleKey: 'home.factorTitle', descKey: 'home.factorDesc', to: '/factor' },
  { titleKey: 'home.equationsTitle', descKey: 'home.equationsDesc', to: '/equations' }
] as const;

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <section className="grid">
      <div className="card page-header">
        <h1>{t('home.chooseTitle')}</h1>
        <p>{t('home.chooseSubtitle')}</p>
      </div>
      <div className="grid two">
        {modeCards.map((card) => (
          <div className="card" key={card.to}>
            <h2>{t(card.titleKey)}</h2>
            <p>{t(card.descKey)}</p>
            <Link className="btn" to={card.to}>
              {t('home.open')}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
