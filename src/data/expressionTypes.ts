import { EquationTarget } from '../types/equations';

export type ExpressionType = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  targets: EquationTarget[];
};

export const expressionTypes: ExpressionType[] = [
  {
    id: 'integers',
    labelKey: 'expressionTypes.integers',
    descriptionKey: 'expressionTypeDescriptions.integers',
    targets: [
      { x2: 0, x: 0, one: 3 },
      { x2: 0, x: 0, one: -4 },
      { x2: 0, x: 0, one: 6 }
    ]
  },
  {
    id: 'zeroPairs',
    labelKey: 'expressionTypes.zeroPairs',
    descriptionKey: 'expressionTypeDescriptions.zeroPairs',
    targets: [
      { x2: 0, x: 0, one: 0 },
      { x2: 0, x: 1, one: -1 },
      { x2: 0, x: -2, one: 2 }
    ]
  },
  {
    id: 'simpleEquations',
    labelKey: 'expressionTypes.simpleEquations',
    descriptionKey: 'expressionTypeDescriptions.simpleEquations',
    targets: [
      { x2: 0, x: 1, one: 2 },
      { x2: 0, x: 2, one: -1 },
      { x2: 0, x: -3, one: 4 }
    ]
  },
  {
    id: 'twoSideEquations',
    labelKey: 'expressionTypes.twoSideEquations',
    descriptionKey: 'expressionTypeDescriptions.twoSideEquations',
    targets: [
      { x2: 0, x: 2, one: -1 },
      { x2: 0, x: 1, one: 3 },
      { x2: 0, x: -2, one: 5 }
    ]
  },
  {
    id: 'likeTerms',
    labelKey: 'expressionTypes.likeTerms',
    descriptionKey: 'expressionTypeDescriptions.likeTerms',
    targets: [
      { x2: 0, x: 3, one: -2 },
      { x2: 0, x: 4, one: 1 },
      { x2: 0, x: -2, one: -3 }
    ]
  },
  {
    id: 'distributive',
    labelKey: 'expressionTypes.distributive',
    descriptionKey: 'expressionTypeDescriptions.distributive',
    targets: [
      { x2: 0, x: 4, one: 0 },
      { x2: 0, x: 5, one: 2 },
      { x2: 0, x: -4, one: -1 }
    ]
  },
  {
    id: 'areaProducts',
    labelKey: 'expressionTypes.areaProducts',
    descriptionKey: 'expressionTypeDescriptions.areaProducts',
    targets: [
      { x2: 1, x: 2, one: 1 },
      { x2: 1, x: 3, one: 2 },
      { x2: 1, x: 4, one: 3 }
    ]
  },
  {
    id: 'binomialMultiplication',
    labelKey: 'expressionTypes.binomialMultiplication',
    descriptionKey: 'expressionTypeDescriptions.binomialMultiplication',
    targets: [
      { x2: 1, x: 3, one: 2 },
      { x2: 1, x: 4, one: 3 },
      { x2: 1, x: 5, one: 4 }
    ]
  },
  {
    id: 'perfectSquare',
    labelKey: 'expressionTypes.perfectSquare',
    descriptionKey: 'expressionTypeDescriptions.perfectSquare',
    targets: [
      { x2: 1, x: 2, one: 1 },
      { x2: 1, x: 4, one: 4 },
      { x2: 1, x: 6, one: 9 }
    ]
  },
  {
    id: 'completeSquare',
    labelKey: 'expressionTypes.completeSquare',
    descriptionKey: 'expressionTypeDescriptions.completeSquare',
    targets: [
      { x2: 1, x: 4, one: 3 },
      { x2: 1, x: 6, one: 5 },
      { x2: 1, x: 8, one: 7 }
    ]
  }
];
