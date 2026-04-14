import { EquationTarget } from '../types/equations';

export type ExpressionType = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  target: EquationTarget;
};

export const expressionTypes: ExpressionType[] = [
  {
    id: 'integers',
    labelKey: 'expressionTypes.integers',
    descriptionKey: 'expressionTypeDescriptions.integers',
    target: { x2: 0, x: 0, one: 3 }
  },
  {
    id: 'zeroPairs',
    labelKey: 'expressionTypes.zeroPairs',
    descriptionKey: 'expressionTypeDescriptions.zeroPairs',
    target: { x2: 0, x: 0, one: 0 }
  },
  {
    id: 'simpleEquations',
    labelKey: 'expressionTypes.simpleEquations',
    descriptionKey: 'expressionTypeDescriptions.simpleEquations',
    target: { x2: 0, x: 1, one: 2 }
  },
  {
    id: 'twoSideEquations',
    labelKey: 'expressionTypes.twoSideEquations',
    descriptionKey: 'expressionTypeDescriptions.twoSideEquations',
    target: { x2: 0, x: 2, one: -1 }
  },
  {
    id: 'likeTerms',
    labelKey: 'expressionTypes.likeTerms',
    descriptionKey: 'expressionTypeDescriptions.likeTerms',
    target: { x2: 0, x: 3, one: -2 }
  },
  {
    id: 'distributive',
    labelKey: 'expressionTypes.distributive',
    descriptionKey: 'expressionTypeDescriptions.distributive',
    target: { x2: 0, x: 4, one: 0 }
  },
  {
    id: 'areaProducts',
    labelKey: 'expressionTypes.areaProducts',
    descriptionKey: 'expressionTypeDescriptions.areaProducts',
    target: { x2: 1, x: 2, one: 1 }
  },
  {
    id: 'binomialMultiplication',
    labelKey: 'expressionTypes.binomialMultiplication',
    descriptionKey: 'expressionTypeDescriptions.binomialMultiplication',
    target: { x2: 1, x: 3, one: 2 }
  },
  {
    id: 'perfectSquare',
    labelKey: 'expressionTypes.perfectSquare',
    descriptionKey: 'expressionTypeDescriptions.perfectSquare',
    target: { x2: 1, x: 2, one: 1 }
  },
  {
    id: 'completeSquare',
    labelKey: 'expressionTypes.completeSquare',
    descriptionKey: 'expressionTypeDescriptions.completeSquare',
    target: { x2: 1, x: 4, one: 3 }
  }
];
