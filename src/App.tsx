import { useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
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
            aria-label="Legenda"
            title="Legenda"
          >
            ?
          </button>
        </div>
        <nav className="nav">
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/equations">{t('nav.equations')}</Link>
          <Link to="/canvas-basico">{t('nav.canvasBasico')}</Link>
          <Link to="/solve">{t('nav.solve')}</Link>
          <Link to="/factor">{t('nav.factor')}</Link>
        </nav>
        <div>
          <button
            className="btn secondary"
            onClick={() => i18n.changeLanguage('pt-BR')}
          >
            PT
          </button>{' '}
          <button
            className="btn secondary"
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
      <LegendModal isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} />
    </div>
  );
}
