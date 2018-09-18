import PuzzleGenerator from 'finding-words/model/puzzle-generator'
import { IGameState } from 'finding-words/types'
import { ADD_ANSWER, RESTART, UPDATE_SOLUTION } from './constants'
import { GameActionType } from './game-actions'

const name = localStorage.getItem('name')
const SOLUTION = (name || 'NORA').toUpperCase().split('')
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const initialGameState: IGameState = {
  grid: new PuzzleGenerator(5, SOLUTION, NOISE).grid,
  noise: NOISE,
  size: 5,
  solution: SOLUTION
}

export default function game(
  state = initialGameState,
  action: GameActionType
): IGameState {
  switch (action.type) {
    case RESTART:
      return {
        ...state,
        grid: new PuzzleGenerator(state.size, state.solution, state.noise).grid
      }
    case UPDATE_SOLUTION: {
      return {
        ...state,
        solution: action.solution
      }
    }
    case ADD_ANSWER: {
      const updatedGrid = state.grid.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          if (
            action.item.row === rowIndex &&
            action.item.column === columnIndex
          ) {
            return action.item
          }
          return state.grid[rowIndex][columnIndex]
        })
      )
      return {
        ...state,
        grid: updatedGrid
      }
    }
    default:
      return state
  }
}
