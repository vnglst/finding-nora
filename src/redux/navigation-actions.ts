import * as constants from './constants'

export type NavigationActionType = ISetActiveScreen

interface ISetActiveScreen {
  type: constants.SET_ACTIVE_SCREEN
  screen: string
}

export const setActiveScreen = (screen: string): ISetActiveScreen => {
  return {
    screen,
    type: constants.SET_ACTIVE_SCREEN,
  }
}
