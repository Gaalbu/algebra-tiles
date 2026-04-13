import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeScreen } from './screens/HomeScreen';
import { EquationSelectScreen } from './screens/EquationSelectScreen';
import { DifficultySelectScreen } from './screens/DifficultySelectScreen';
import { WorkspaceScreen } from './screens/WorkspaceScreen';
import { useAppStore } from './store/appStore';

export function App() {
  const { t, i18n } = useTranslation();
  const { state } = useAppStore();

  const hasSet = Boolean(state.selection.equationSetId);
  const hasDifficulty = Boolean(state.selection.difficultyId);

  return (
    <div>
      <header className="header">
        <div>
          <strong>{t('app.title')}</strong>
        </div>
        <nav className="nav">
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/equations">{t('nav.equations')}</Link>
          <Link to="/difficulty">{t('nav.difficulty')}</Link>
          <Link to="/workspace">{t('nav.workspace')}</Link>
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
          <Route
            path="/workspace"
            element={
              hasDifficulty ? (
                <WorkspaceScreen />
              ) : (
                <Navigate to="/difficulty" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
