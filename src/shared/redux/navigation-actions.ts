import * as constants from './constants'

export type NavigationActionType = ISetActivePage

interface ISetActivePage {
  type: constants.SET_ACTIVE_PAGE
  page: string
}

export const setActiveScreen = (page: string): ISetActivePage => {
  return {
    page,
    type: constants.SET_ACTIVE_PAGE
  }
}
