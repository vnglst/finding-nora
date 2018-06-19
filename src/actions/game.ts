import * as constants from '../constants'
import { Grid } from '../types'

export interface ISetGrid {
  type: constants.SET_GRID
  grid: Grid
}

export function setGrid(grid: Grid): ISetGrid {
  return {
    grid,
    type: constants.SET_GRID,
  }
}
