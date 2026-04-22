import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TILE_LEGEND } from '../data/tiles';

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <section className="grid">
      <div className="card page-header">
        <h1>{t('home.chooseTitle')}</h1>
        <p>{t('home.chooseSubtitle')}</p>
      </div>
      <div className="card tile-legend">
        <h2>Representacao das pecas</h2>
        <div className="legend-table-wrapper">
          <table className="legend-table">
            <thead>
              <tr>
                <th>Peca</th>
                <th>Dimensoes</th>
                <th>Representacao</th>
                <th>Leitura didatica</th>
              </tr>
            </thead>
            <tbody>
              {TILE_LEGEND.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <div className="legend-piece">
                      <span
                        className={`legend-swatch ${entry.swatchClass ?? 'muted'}`}
                        aria-hidden="true"
                      />
                      <span>{entry.name}</span>
                    </div>
                  </td>
                  <td>{entry.dimensions}</td>
                  <td>{entry.representation}</td>
                  <td>{entry.reading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
