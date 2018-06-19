import { Grid, IGridItem } from '../components/Game/game-model'

export type Grid = Grid
export type IGridItem = IGridItem

export interface IGameState {
  grid: Grid | null
  noise: string
  solution: string
  size: number
}

export interface INavigationState {
  currentScreen: string
}

export interface IStoreState {
  game: IGameState
  navigation: INavigationState
}
