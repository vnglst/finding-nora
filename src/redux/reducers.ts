import * as qs from 'qs'
import { combineReducers } from 'redux'
import { IGameState, INavigationState } from '../types'
import { ADD_ANSWER, RESTART, SET_ACTIVE_SCREEN } from './constants'
import { GameAction } from './game-actions'
import { generateGridWithPuzzle } from './game-model'
import { ISetActiveScreen } from './navigation-actions'

const query = qs.parse(location.search.substr(1).toLowerCase())
const SOLUTION = (query.name || 'NORA').toUpperCase().split('')
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const initialNavigationState: INavigationState = {
  currentScreen: 'home',
}

function navigation(
  state = initialNavigationState,
  action: ISetActiveScreen,
): INavigationState {
  switch (action.type) {
    case SET_ACTIVE_SCREEN:
      return { ...state, currentScreen: action.screen }
    default:
      return state
  }
}

const initialGameState: IGameState = {
  grid: generateGridWithPuzzle({
    noise: NOISE,
    size: 5,
    solution: SOLUTION,
  }),
  noise: NOISE,
  size: 5,
  solution: SOLUTION,
}

function game(state = initialGameState, action: GameAction): IGameState {
  switch (action.type) {
    case RESTART:
      return {
        ...state,
        grid: generateGridWithPuzzle({
          noise: state.noise,
          size: state.size,
          solution: state.solution,
        }),
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
