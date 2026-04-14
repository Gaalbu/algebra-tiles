export type Difficulty = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  level: number;
  target: EquationTarget;
};

export type EquationTarget = {
  x2: number;
  x: number;
  one: number;
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
  expressionTypeId?: string;
};
