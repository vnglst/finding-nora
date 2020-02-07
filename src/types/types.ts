export enum Status {
  Correct = "Correct",
  Wrong = "Wrong",
  AlmostCorrect = "AlmostCorrect"
}
export interface GridItem {
  row: number;
  column: number;
  letter: string;
  status?: Status;
}

export type GridType = GridItem[][];
