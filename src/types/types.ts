import { IAddAnswer } from '../redux/game'
import { GridType, IGridItem } from '../redux/game-model'

export type GridType = GridType
export type IGridItem = IGridItem
export type IAddAnswer = IAddAnswer

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
