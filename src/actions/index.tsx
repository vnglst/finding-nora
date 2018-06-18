import * as constants from '../constants'

export interface ISetActiveScreen {
  type: constants.SET_ACTIVE_SCREEN
  screen: string
}

export function setActiveScreen(screen: string): ISetActiveScreen {
  return {
    screen,
    type: constants.SET_ACTIVE_SCREEN,
  }
}
