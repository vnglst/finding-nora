import { ISetActiveScreen } from '../actions'
import { SET_ACTIVE_SCREEN } from '../constants'
import { IStoreState } from '../types'

export function navigation(
  state: IStoreState,
  action: ISetActiveScreen,
): IStoreState {
  switch (action.type) {
    case SET_ACTIVE_SCREEN:
      return { ...state, currentScreen: action.screen }
    default:
      return state
  }
}
