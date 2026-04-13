import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'pt-BR': {
    translation: {
      app: {
        title: 'Blocos Algebricos'
      },
      nav: {
        home: 'Inicio',
        equations: 'Equacoes',
        difficulty: 'Dificuldade',
        workspace: 'Workspace'
      },
      home: {
        title: 'Aprenda com blocos algebricos',
        subtitle: 'Escolha um conjunto de equacoes e comece a montar.',
        start: 'Iniciar agora'
      },
      equations: {
        title: 'Selecao de equacoes',
        subtitle: 'Escolha um conjunto para praticar'
      },
      difficulty: {
        title: 'Selecione a dificuldade',
        subtitle: 'Defina o nivel para o conjunto escolhido',
        easy: 'Facil',
        easyDesc: 'Equacoes introdutorias',
        medium: 'Medio',
        mediumDesc: 'Mais termos e sinais',
        hard: 'Dificil',
        hardDesc: 'Desafios completos'
      },
      workspace: {
        title: 'Workspace',
        subtitle: 'Monte sua solucao com blocos',
        inventory: 'Inventario',
        grid: 'Area de montagem',
        tools: 'Ferramentas',
        expression: 'Expressao ativa',
        clear: 'Limpar workspace',
        undo: 'Desfazer',
        redo: 'Refazer',
        check: 'Verificar resultado'
      },
      actions: {
        select: 'Selecionar',
        back: 'Voltar'
      },
      equationsData: {
        linearTitle: 'Equacoes lineares',
        linearDesc: 'Trabalhe com termos x e constantes',
        quadraticTitle: 'Equacoes quadradas',
        quadraticDesc: 'Inclui termos x^2',
        mixTitle: 'Misturadas',
        mixDesc: 'Combina varios formatos'
      }
    }
  },
  en: {
    translation: {
      app: {
        title: 'Algebra Tiles'
      },
      nav: {
        home: 'Home',
        equations: 'Equations',
        difficulty: 'Difficulty',
        workspace: 'Workspace'
      },
      home: {
        title: 'Learn with algebra tiles',
        subtitle: 'Choose an equation set and start building.',
        start: 'Start now'
      },
      equations: {
        title: 'Equation selection',
        subtitle: 'Pick a set to practice'
      },
      difficulty: {
        title: 'Select difficulty',
        subtitle: 'Define the level for the chosen set',
        easy: 'Easy',
        easyDesc: 'Intro equations',
        medium: 'Medium',
        mediumDesc: 'More terms and signs',
        hard: 'Hard',
        hardDesc: 'Full challenges'
      },
      workspace: {
        title: 'Workspace',
        subtitle: 'Build your solution with tiles',
        inventory: 'Inventory',
        grid: 'Build area',
        tools: 'Tools',
        expression: 'Active expression',
        clear: 'Clear workspace',
        undo: 'Undo',
        redo: 'Redo',
        check: 'Check result'
      },
      actions: {
        select: 'Select',
        back: 'Back'
      },
      equationsData: {
        linearTitle: 'Linear equations',
        linearDesc: 'Work with x terms and constants',
        quadraticTitle: 'Quadratic equations',
        quadraticDesc: 'Includes x^2 terms',
        mixTitle: 'Mixed',
        mixDesc: 'Combines different formats'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt-BR',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
