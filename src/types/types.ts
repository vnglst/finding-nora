export enum StatusEnum {
  Correct = 'Correct',
  Wrong = 'Wrong',
  AlmostCorrect = 'AlmostCorrect',
}

export interface IGameState {
  grid: GridType
  noise: string[]
  solution: string[]
  size: number
}

export interface INavigationState {
  currentScreen: string
}

export interface IStoreState {
  game: IGameState
  navigation: INavigationState
}

export interface IGridItem {
  column: number
  letter: string
  row: number
  status?: StatusEnum
  updatedAt: Date
}

export type GridType = IGridItem[][]
