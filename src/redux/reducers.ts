import PuzzleGenerator from 'model/puzzle-generator'
import { combineReducers } from 'redux'
import { IGameState, INavigationState } from 'types'
import {
  ADD_ANSWER,
  RESTART,
  SET_ACTIVE_PAGE,
  UPDATE_SOLUTION,
} from './constants'
import { GameActionType } from './game-actions'
import { NavigationActionType } from './navigation-actions'

const name = localStorage.getItem('name')
const SOLUTION = (name || 'NORA').toUpperCase().split('')
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const initialNavigationState: INavigationState = {
  currentPage: 'home',
}

function navigation(
  state = initialNavigationState,
  action: NavigationActionType,
): INavigationState {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return { ...state, currentPage: action.page }
    default:
      return state
  }
}

const initialGameState: IGameState = {
  grid: new PuzzleGenerator(5, SOLUTION, NOISE).grid,
  noise: NOISE,
  size: 5,
  solution: SOLUTION,
}

function game(state = initialGameState, action: GameActionType): IGameState {
  switch (action.type) {
    case RESTART:
      return {
        ...state,
        grid: new PuzzleGenerator(state.size, state.solution, state.noise).grid,
      }
    case UPDATE_SOLUTION: {
      return {
        ...state,
        solution: action.solution,
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
        }),
      )
      return {
        ...state,
        grid: updatedGrid,
      }
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  game,
  navigation,
})

export default rootReducer
