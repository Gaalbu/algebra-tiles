import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <section className="grid">
      <div className="card page-header">
        <h1>{t('home.chooseTitle')}</h1>
        <p>{t('home.chooseSubtitle')}</p>
      </div>
      <div className="grid two">
        <div className="card">
          <h2>{t('home.canvasBasicoTitle')}</h2>
          <p>{t('home.canvasBasicoDesc')}</p>
          <Link className="btn" to="/canvas-basico">
            {t('home.open')}
          </Link>
        </div>
        <div className="card">
          <h2>{t('home.solveTitle')}</h2>
          <p>{t('home.solveDesc')}</p>
          <Link className="btn" to="/solve">
            {t('home.open')}
          </Link>
        </div>
        <div className="card">
          <h2>{t('home.factorTitle')}</h2>
          <p>{t('home.factorDesc')}</p>
          <Link className="btn" to="/factor">
            {t('home.open')}
          </Link>
        </div>
        <div className="card">
          <h2>{t('home.equationsTitle')}</h2>
          <p>{t('home.equationsDesc')}</p>
          <Link className="btn" to="/equations">
            {t('home.open')}
          </Link>
        </div>
      </div>
    </section>
  );
}
