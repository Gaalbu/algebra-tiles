import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'pt-BR': {
    translation: {
      app: {
        title: 'Blocos Algébricos'
      },
      nav: {
        home: 'Início',
        equations: 'Equações',
        difficulty: 'Dificuldade',
        workspace: 'Workspace',
        canvasBasico: 'Canvas básico',
        solve: 'Solve',
        factor: 'Factor'
      },
      home: {
        title: 'Aprenda com blocos algébricos',
        subtitle: 'Escolha um conjunto de equações e comece a montar.',
        start: 'Iniciar agora',
        chooseTitle: 'Escolha a atividade',
        chooseSubtitle: 'Selecione a página que deseja abrir.',
        open: 'Abrir',
        canvasBasicoTitle: 'Canvas básico',
        canvasBasicoDesc: 'Monte blocos livremente e experimente expressoes.',
        solveTitle: 'Solve',
        solveDesc: 'Equações com dois lados e operações equivalentes.',
        factorTitle: 'Factor',
        factorDesc: 'Modelagem de área para fatoração.',
        equationsTitle: 'Equações',
        equationsDesc: 'Selecione desafios por nível.'
      },
      equations: {
        title: 'Seleção de expressões',
        subtitle: 'Escolha um tipo para trabalhar',
        selected: 'Selecionado:'
      },
      difficulty: {
        title: 'Selecione a dificuldade',
        subtitle: 'Defina o nível para o conjunto escolhido',
        easy: 'Fácil',
        easyDesc: 'Equações introdutorias',
        medium: 'Médio',
        mediumDesc: 'Mais termos e sinais',
        hard: 'Difícil',
        hardDesc: 'Desafios completos'
      },
      workspace: {
        title: 'Workspace',
        subtitle: 'Monte sua solução com blocos',
        inventory: 'Inventário',
        grid: 'Área de montagem',
        tools: 'Ferramentas',
        expression: 'Expressão ativa',
        clear: 'Limpar workspace',
        zeroPair: 'Zero pair',
        deleteSelected: 'Apagar selecionado',
        backToSelection: 'Voltar para seleção',
        selectedEquation: 'Equação selecionada:' ,
        undo: 'Desfazer',
        redo: 'Refazer',
        check: 'Verificar resultado',
        target: 'Objetivo'
      },
      canvasBasico: {
        title: 'Canvas básico',
        subtitle: 'Monte blocos livremente e teste expressões.'
      },
      solve: {
        title: 'Solve',
        subtitle: 'Equações com dois lados e operações equivalentes.',
        placeholder: 'Digite a equação (ex.: x + 2 = 5)',
        leftSide: 'Lado esquerdo',
        rightSide: 'Lado direito',
        summary: 'Resumo da equação'
      },
      factor: {
        title: 'Factor',
        subtitle: 'Modele a área para fatorar polinômios.',
        gridLabel: 'Área de fatoração',
        resultLabel: 'Resultado',
        autoHint: 'Detecção automática do retângulo pelo canvas',
        valid: 'Fatoração detectada:',
        invalid: 'Retângulo inválido ou incompleto.',
        gaps: 'Lacunas',
        overlaps: 'Sobreposições',
        gapSample: 'Exemplos de lacunas',
        overlapSample: 'Exemplos de sobreposições',
        times: 'x'
      },
      expression: {
        placeholder: 'Digite a expressão (ex.: x² + 3x - 2)',
        showSolution: 'Mostrar solução em blocos',
        invalid: 'Expressão inválida',
        typeLabel: 'Tipo de expressão'
      },
      expressionTypes: {
        integers: 'Inteiros com sinal',
        zeroPairs: 'Pares nulos',
        simpleEquations: 'Equações simples',
        twoSideEquations: 'Equações com dois lados',
        likeTerms: 'Termos semelhantes',
        distributive: 'Distributiva',
        areaProducts: 'Área de produtos algébricos',
        binomialMultiplication: 'Multiplicação de binômios',
        perfectSquare: 'Quadrado perfeito',
        completeSquare: 'Completar quadrados'
      },
      expressionTypeDescriptions: {
        integers: 'Operacoes com inteiros e sinais.',
        zeroPairs: 'Identifique e use pares nulos.',
        simpleEquations: 'Equações com uma variável.',
        twoSideEquations: 'Equações com dois lados.',
        likeTerms: 'Simplifique termos semelhantes.',
        distributive: 'Aplique a propriedade distributiva.',
        areaProducts: 'Produtos por área e retângulos.',
        binomialMultiplication: 'Multiplique binômios com blocos.',
        perfectSquare: 'Reconheca quadrados perfeitos.',
        completeSquare: 'Complete quadrados para fatorar.'
      },
      validation: {
        title: {
          success: 'Parabéns!',
          fail: 'Tente novamente'
        },
        success: 'Resultado correto. Muito bem!',
        fail: 'Ainda não. Tente novamente.',
        primarySuccess: 'Novo desafio',
        primaryFail: 'Continuar',
        keep: 'Manter no tabuleiro'
      },
      actions: {
        select: 'Selecionar',
        back: 'Voltar'
      },
      equationsData: {
        linearTitle: 'Equações lineares',
        linearDesc: 'Trabalhe com termos x e constantes',
        quadraticTitle: 'Equações quadradas',
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
        title: 'Expression selection',
        subtitle: 'Pick a type to work with',
        selected: 'Selected:'
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
        backToSelection: 'Back to selection',
        selectedEquation: 'Selected equation:' ,
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
      expressionTypeDescriptions: {
        integers: 'Work with signed integers.',
        zeroPairs: 'Identify and use zero pairs.',
        simpleEquations: 'One-variable equations.',
        twoSideEquations: 'Two-sided equations.',
        likeTerms: 'Combine like terms.',
        distributive: 'Use the distributive property.',
        areaProducts: 'Area products with rectangles.',
        binomialMultiplication: 'Multiply binomials with tiles.',
        perfectSquare: 'Recognize perfect squares.',
        completeSquare: 'Complete squares to factor.'
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
