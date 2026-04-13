import { EquationSet } from '../types/equations';

export const equationSets: EquationSet[] = [
  {
    id: 'linear',
    titleKey: 'equationsData.linearTitle',
    descriptionKey: 'equationsData.linearDesc',
    difficulties: [
      {
        id: 'easy',
        labelKey: 'difficulty.easy',
        descriptionKey: 'difficulty.easyDesc',
        level: 1,
        target: { x2: 0, x: 1, one: 2 }
      },
      {
        id: 'medium',
        labelKey: 'difficulty.medium',
        descriptionKey: 'difficulty.mediumDesc',
        level: 2,
        target: { x2: 0, x: 3, one: -1 }
      },
      {
        id: 'hard',
        labelKey: 'difficulty.hard',
        descriptionKey: 'difficulty.hardDesc',
        level: 3,
        target: { x2: 0, x: -4, one: 5 }
      }
    ]
  },
  {
    id: 'quadratic',
    titleKey: 'equationsData.quadraticTitle',
    descriptionKey: 'equationsData.quadraticDesc',
    difficulties: [
      {
        id: 'easy',
        labelKey: 'difficulty.easy',
        descriptionKey: 'difficulty.easyDesc',
        level: 1,
        target: { x2: 1, x: 0, one: -2 }
      },
      {
        id: 'medium',
        labelKey: 'difficulty.medium',
        descriptionKey: 'difficulty.mediumDesc',
        level: 2,
        target: { x2: 2, x: -1, one: 3 }
      },
      {
        id: 'hard',
        labelKey: 'difficulty.hard',
        descriptionKey: 'difficulty.hardDesc',
        level: 3,
        target: { x2: -1, x: 2, one: -4 }
      }
    ]
  },
  {
    id: 'mixed',
    titleKey: 'equationsData.mixTitle',
    descriptionKey: 'equationsData.mixDesc',
    difficulties: [
      {
        id: 'easy',
        labelKey: 'difficulty.easy',
        descriptionKey: 'difficulty.easyDesc',
        level: 1,
        target: { x2: 1, x: 2, one: 1 }
      },
      {
        id: 'medium',
        labelKey: 'difficulty.medium',
        descriptionKey: 'difficulty.mediumDesc',
        level: 2,
        target: { x2: -1, x: 1, one: 4 }
      },
      {
        id: 'hard',
        labelKey: 'difficulty.hard',
        descriptionKey: 'difficulty.hardDesc',
        level: 3,
        target: { x2: 2, x: -3, one: -2 }
      }
    ]
  }
];
