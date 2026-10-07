import { useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeScreen } from './screens/HomeScreen';
import { EquationSelectScreen } from './screens/EquationSelectScreen';
import { DifficultySelectScreen } from './screens/DifficultySelectScreen';
import { WorkspaceScreen } from './screens/WorkspaceScreen';
import { CanvasBasicoScreen } from './screens/CanvasBasicoScreen';
import { SolveScreen } from './screens/SolveScreen';
import { FactorScreen } from './screens/FactorScreen';
import { useAppStore } from './store/appStore';
import { LegendModal } from './components/LegendModal';

export function App() {
  const { t, i18n } = useTranslation();
  const { state } = useAppStore();
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const hasSet = Boolean(state.selection.equationSetId);

  return (
    <div>
      <header className="header">
        <div className="header-title">
          <strong>{t('app.title')}</strong>
          <button
            className="icon-button"
            type="button"
            onClick={() => setIsLegendOpen(true)}
            aria-label={t('legend.open')}
            title={t('legend.open')}
          >
            ?
          </button>
        </div>
        <nav className="nav">
          <NavLink to="/" end>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/equations">{t('nav.equations')}</NavLink>
          <NavLink to="/canvas-basico">{t('nav.canvasBasico')}</NavLink>
          <NavLink to="/solve">{t('nav.solve')}</NavLink>
          <NavLink to="/factor">{t('nav.factor')}</NavLink>
        </nav>
        <div className="lang" role="group" aria-label={t('app.language')}>
          <button
            type="button"
            aria-pressed={i18n.language.startsWith('pt')}
            onClick={() => i18n.changeLanguage('pt-BR')}
          >
            PT
          </button>
          <button
            type="button"
            aria-pressed={!i18n.language.startsWith('pt')}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/equations" element={<EquationSelectScreen />} />
          <Route
            path="/difficulty"
            element={
              hasSet ? <DifficultySelectScreen /> : <Navigate to="/equations" />
            }
          />
          <Route path="/workspace" element={<WorkspaceScreen />} />
          <Route path="/canvas-basico" element={<CanvasBasicoScreen />} />
          <Route path="/solve" element={<SolveScreen />} />
          <Route path="/factor" element={<FactorScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-mark">{t('app.title')}</span>
          <span>{t('footer.credit')}</span>
          <a href="https://github.com/Gaalbu/algebra-tiles">GitHub</a>
        </div>
      </footer>
      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />
    </div>
  );
}
