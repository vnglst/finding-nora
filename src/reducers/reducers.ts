import * as qs from 'qs'
import { ISetGrid } from '../actions/game'
import { ISetActiveScreen } from '../actions/navigation'
import generateGridWithPuzzle from '../components/Game/game-model'
import { SET_ACTIVE_SCREEN, SET_GRID } from '../constants'
import { IGameState, INavigationState } from '../types'

const query = qs.parse(location.search.substr(1).toLowerCase())
const SOLUTION = (query.name || 'NORA').toUpperCase()
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const initialGameState: IGameState = {
  grid: generateGridWithPuzzle({
    noise: NOISE.split(''),
    size: 5,
    solution: SOLUTION.split(''),
  }),
  noise: NOISE,
  size: 5,
  solution: SOLUTION,
}

const initialNavigationState: INavigationState = {
  currentScreen: 'home',
}

export function navigation(
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

export function game(state = initialGameState, action: ISetGrid): IGameState {
  switch (action.type) {
    case SET_GRID:
      return { ...state, grid: action.grid }
    default:
      return state
  }
}
