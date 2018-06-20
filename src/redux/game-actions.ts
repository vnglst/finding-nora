// tslint:disable:no-console
import { GridType, IGridItem } from '../types'
import * as constants from './constants'
import { isCorrectAnswer } from './game-model'

export type GameAction = IAddAnswerReturn | IRestartReturn

interface IRestartReturn {
  type: constants.RESTART
}

export function restart(): IRestartReturn {
  return {
    type: constants.RESTART,
  }
}

interface IAddAnswerReturn {
  type: constants.ADD_ANSWER
  item: IGridItem
}

export interface IAddAnswer {
  answer: IGridItem
  solution: string[]
  grid: GridType
}

export function addAnswer({
  answer,
  solution,
  grid,
}: IAddAnswer): IAddAnswerReturn {
  const isCorrect = isCorrectAnswer({ answer, solution, grid })
  return {
    item: {
      ...answer,
      status: isCorrect ? 'correct' : 'incorrect',
      updatedAt: new Date(),
    },
    type: constants.ADD_ANSWER,
  }
}
