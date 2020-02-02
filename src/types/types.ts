
export enum StatusEnum {
  Correct = "Correct",
  Wrong = "Wrong",
  AlmostCorrect = "AlmostCorrect"
}
export interface IGridItem {
  row: number;
  column: number;
  letter: string;
  status?: StatusEnum;
}

export type GridType = IGridItem[][];
