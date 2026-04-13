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
        level: 1
      },
      {
        id: 'medium',
        labelKey: 'difficulty.medium',
        descriptionKey: 'difficulty.mediumDesc',
        level: 2
      },
      {
        id: 'hard',
        labelKey: 'difficulty.hard',
        descriptionKey: 'difficulty.hardDesc',
        level: 3
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
        level: 1
      },
      {
        id: 'medium',
        labelKey: 'difficulty.medium',
        descriptionKey: 'difficulty.mediumDesc',
        level: 2
      },
      {
        id: 'hard',
        labelKey: 'difficulty.hard',
        descriptionKey: 'difficulty.hardDesc',
        level: 3
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
        level: 1
      },
      {
        id: 'medium',
        labelKey: 'difficulty.medium',
        descriptionKey: 'difficulty.mediumDesc',
        level: 2
      },
      {
        id: 'hard',
        labelKey: 'difficulty.hard',
        descriptionKey: 'difficulty.hardDesc',
        level: 3
      }
    ]
  }
];
