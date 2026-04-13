import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <section className="grid two">
      <div className="card">
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>
        <Link className="btn" to="/equations">
          {t('home.start')}
        </Link>
      </div>
      <div className="card">
        <h2>{t('workspace.title')}</h2>
        <p>
          {t('workspace.subtitle')} O canvas, inventario e expressao ativa
          aparecerao aqui.
        </p>
      </div>
    </section>
  );
}
