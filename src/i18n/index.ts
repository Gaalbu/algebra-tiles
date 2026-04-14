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
        workspace: 'Workspace',
        canvasBasico: 'Canvas basico',
        solve: 'Solve',
        factor: 'Factor'
      },
      home: {
        title: 'Aprenda com blocos algebricos',
        subtitle: 'Escolha um conjunto de equacoes e comece a montar.',
        start: 'Iniciar agora',
        chooseTitle: 'Escolha a atividade',
        chooseSubtitle: 'Selecione a pagina que deseja abrir.',
        open: 'Abrir',
        canvasBasicoTitle: 'Canvas basico',
        canvasBasicoDesc: 'Monte blocos livremente e experimente expressoes.',
        solveTitle: 'Solve',
        solveDesc: 'Equacoes com dois lados e operacoes equivalentes.',
        factorTitle: 'Factor',
        factorDesc: 'Modelagem de area para fatoracao.',
        equationsTitle: 'Equacoes',
        equationsDesc: 'Selecione desafios por nivel.'
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
        zeroPair: 'Zero pair',
        deleteSelected: 'Apagar selecionado',
        undo: 'Desfazer',
        redo: 'Refazer',
        check: 'Verificar resultado',
        target: 'Objetivo'
      },
      canvasBasico: {
        title: 'Canvas basico',
        subtitle: 'Monte blocos livremente e teste expressoes.'
      },
      solve: {
        title: 'Solve',
        subtitle: 'Equacoes com dois lados e operacoes equivalentes.',
        placeholder: 'Digite a equacao (ex.: x + 2 = 5)',
        leftSide: 'Lado esquerdo',
        rightSide: 'Lado direito',
        summary: 'Resumo da equacao'
      },
      factor: {
        title: 'Factor',
        subtitle: 'Modele a area para fatorar polinomios.',
        gridLabel: 'Area de fatoracao',
        resultLabel: 'Resultado',
        autoHint: 'Deteccao automatica do retangulo pelo canvas',
        valid: 'Fatoracao detectada:',
        invalid: 'Retangulo invalido ou incompleto.',
        gaps: 'Lacunas',
        overlaps: 'Sobreposicoes',
        gapSample: 'Exemplos de lacunas',
        overlapSample: 'Exemplos de sobreposicoes',
        times: 'x'
      },
      expression: {
        placeholder: 'Digite a expressao (ex.: x² + 3x - 2)',
        showSolution: 'Mostrar solucao em blocos',
        invalid: 'Expressao invalida',
        typeLabel: 'Tipo de expressao'
      },
      expressionTypes: {
        integers: 'Inteiros com sinal',
        zeroPairs: 'Pares nulos',
        simpleEquations: 'Equacoes simples',
        twoSideEquations: 'Equacoes com dois lados',
        likeTerms: 'Termos semelhantes',
        distributive: 'Distributiva',
        areaProducts: 'Area de produtos algebricos',
        binomialMultiplication: 'Multiplicacao de binomios',
        perfectSquare: 'Quadrado perfeito',
        completeSquare: 'Completar quadrados'
      },
      validation: {
        title: {
          success: 'Parabens!',
          fail: 'Tente novamente'
        },
        success: 'Resultado correto. Muito bem!',
        fail: 'Ainda nao. Tente novamente.',
        primarySuccess: 'Novo desafio',
        primaryFail: 'Continuar',
        keep: 'Manter no tabuleiro'
      },
      actions: {
        select: 'Selecionar',
        back: 'Voltar'
      },
      equationsData: {
        linearTitle: 'Equacoes lineares',
        linearDesc: 'Trabalhe com termos x e constantes',
        quadraticTitle: 'Equacoes quadradas',
        quadraticDesc: 'Inclui termos x²',
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
        workspace: 'Workspace',
        canvasBasico: 'Basic canvas',
        solve: 'Solve',
        factor: 'Factor'
      },
      home: {
        title: 'Learn with algebra tiles',
        subtitle: 'Choose an equation set and start building.',
        start: 'Start now',
        chooseTitle: 'Choose an activity',
        chooseSubtitle: 'Select the page you want to open.',
        open: 'Open',
        canvasBasicoTitle: 'Basic canvas',
        canvasBasicoDesc: 'Build freely and experiment with expressions.',
        solveTitle: 'Solve',
        solveDesc: 'Two-sided equations with equivalent operations.',
        factorTitle: 'Factor',
        factorDesc: 'Area modeling for factoring.',
        equationsTitle: 'Equations',
        equationsDesc: 'Pick challenges by level.'
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
        zeroPair: 'Zero pair',
        deleteSelected: 'Delete selected',
        undo: 'Undo',
        redo: 'Redo',
        check: 'Check result',
        target: 'Target'
      },
      canvasBasico: {
        title: 'Basic canvas',
        subtitle: 'Build freely and test expressions.'
      },
      solve: {
        title: 'Solve',
        subtitle: 'Two-sided equations with equivalent operations.',
        placeholder: 'Type the equation (e.g. x + 2 = 5)',
        leftSide: 'Left side',
        rightSide: 'Right side',
        summary: 'Equation summary'
      },
      factor: {
        title: 'Factor',
        subtitle: 'Use area modeling to factor polynomials.',
        gridLabel: 'Factor area',
        resultLabel: 'Result',
        autoHint: 'Automatic rectangle detection from the canvas',
        valid: 'Factorization detected:',
        invalid: 'Invalid or incomplete rectangle.',
        gaps: 'Gaps',
        overlaps: 'Overlaps',
        gapSample: 'Gap samples',
        overlapSample: 'Overlap samples',
        times: 'x'
      },
      expression: {
        placeholder: 'Type the expression (e.g. x² + 3x - 2)',
        showSolution: 'Show solution as tiles',
        invalid: 'Invalid expression',
        typeLabel: 'Expression type'
      },
      expressionTypes: {
        integers: 'Signed integers',
        zeroPairs: 'Zero pairs',
        simpleEquations: 'Simple equations',
        twoSideEquations: 'Two-sided equations',
        likeTerms: 'Like terms',
        distributive: 'Distributive property',
        areaProducts: 'Algebraic area products',
        binomialMultiplication: 'Binomial multiplication',
        perfectSquare: 'Perfect square',
        completeSquare: 'Complete the square'
      },
      validation: {
        title: {
          success: 'Well done!',
          fail: 'Try again'
        },
        success: 'Correct result. Great job!',
        fail: 'Not yet. Try again.',
        primarySuccess: 'New challenge',
        primaryFail: 'Keep trying',
        keep: 'Keep on board'
      },
      actions: {
        select: 'Select',
        back: 'Back'
      },
      equationsData: {
        linearTitle: 'Linear equations',
        linearDesc: 'Work with x terms and constants',
        quadraticTitle: 'Quadratic equations',
        quadraticDesc: 'Includes x² terms',
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
