export type Difficulty = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  level: number;
};

export type EquationSet = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  difficulties: Difficulty[];
};

export type SelectionState = {
  equationSetId?: string;
  difficultyId?: string;
};
