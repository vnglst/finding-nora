import * as qs from 'qs'
import { combineReducers } from 'redux'
import { IGameState, INavigationState } from '../types'
import { ADD_ANSWER, SET_ACTIVE_SCREEN, SET_GRID } from './constants'
import { GameAction } from './game'
import generateGridWithPuzzle from './game-model'
import { ISetActiveScreen } from './navigation'

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
    case SET_GRID:
      return { ...state, grid: action.grid }
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
