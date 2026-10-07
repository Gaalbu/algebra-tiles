import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroTiles } from '../components/HeroTiles';

const modeCards = [
  { titleKey: 'home.canvasBasicoTitle', descKey: 'home.canvasBasicoDesc', to: '/canvas-basico' },
  { titleKey: 'home.solveTitle', descKey: 'home.solveDesc', to: '/solve' },
  { titleKey: 'home.factorTitle', descKey: 'home.factorDesc', to: '/factor' },
  { titleKey: 'home.equationsTitle', descKey: 'home.equationsDesc', to: '/equations' }
] as const;

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">{t('home.eyebrow')}</p>
          <h1>
            {t('home.heroLead')} <em>{t('home.heroEm')}</em>
          </h1>
          <p className="hero-lede">{t('home.subtitle')}</p>
          <div className="hero-cta">
            <Link className="btn" to="/canvas-basico">
              {t('home.start')}
            </Link>
            <Link className="btn secondary" to="/factor">
              {t('nav.factor')}
            </Link>
          </div>
        </div>
        <HeroTiles />
      </section>

      <section aria-labelledby="modes-title">
        <h2 id="modes-title" className="sr-only">
          {t('home.chooseTitle')}
        </h2>
        <ul className="modes">
          {modeCards.map((card, index) => (
            <li key={card.to}>
              <Link className="mode" to={card.to}>
                <span className="mode-num mono">{String(index + 1).padStart(2, '0')}</span>
                <span className="mode-body">
                  <strong>{t(card.titleKey)}</strong>
                  <span>{t(card.descKey)}</span>
                </span>
                <span className="mode-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
