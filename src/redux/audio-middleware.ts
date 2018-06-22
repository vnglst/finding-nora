// tslint:disable:no-console
import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { loadAudioUrls, playAudio } from '../play-web-audio'
import { IStoreState } from '../types'
import { ADD_ANSWER, RESTART } from './constants'
import { GameActionType } from './game-actions'
import { didWin } from './game-model'

/**
 * Middleware that plays sounds based on Redux actions
 */
export const audioMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (
  next: Dispatch,
) => (action: GameActionType) => {
  const result = next(action)

  const nextState = getState() as IStoreState

  switch (action.type) {
    case RESTART: {
      playAudio(sounds.restart)
      return result
    }
    case ADD_ANSWER: {
      if (action.item.status === 'incorrect') {
        playAudio(sounds.squakk)
      }
      if (action.item.status === ' correct') {
        playAudio(sounds.nock)
      }
      const hasWon = didWin(nextState.game.solution, nextState.game.grid)
      if (hasWon) {
        playAudio(sounds.hooyeah)
      }

      return result
    }
    default:
      return result
  }
}

const initSounds = () => {
  const loadedSounds: any = {}

  const soundsBaseUrl =
    'https://raw.githubusercontent.com/vnglst/finding-nora/master/public/sounds/'

  const soundUrls = [
    soundsBaseUrl + 'squakk.mp3',
    soundsBaseUrl + 'nock.mp3',
    soundsBaseUrl + 'hooyeah.mp3',
    soundsBaseUrl + 'restart.mp3',
  ]

  loadAudioUrls(soundUrls, bufferList => {
    sounds.squakk = bufferList[0]
    sounds.nock = bufferList[1]
    sounds.hooyeah = bufferList[2]
    sounds.restart = bufferList[3]
  })

  return loadedSounds
}

const sounds = initSounds()
