import React, { createContext, useContext, useReducer } from 'react';
import { SelectionState } from '../types/equations';

type AppState = {
  selection: SelectionState;
};

type AppAction =
  | { type: 'selectEquationSet'; payload: { equationSetId: string } }
  | { type: 'selectDifficulty'; payload: { difficultyId: string } }
  | { type: 'resetSelection' };

const initialState: AppState = {
  selection: {}
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'selectEquationSet':
      return {
        ...state,
        selection: {
          equationSetId: action.payload.equationSetId
        }
      };
    case 'selectDifficulty':
      return {
        ...state,
        selection: {
          ...state.selection,
          difficultyId: action.payload.difficultyId
        }
      };
    case 'resetSelection':
      return initialState;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
}
