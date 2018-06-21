// tslint:disable:no-console
import { GridType, IGridItem } from '../types'
import * as constants from './constants'
import { isCorrectAnswer } from './game-model'

export type GameAction =
  | IAddAsCorrectAnswer
  | IAddAsWrongAnswer
  | IRestart
  | IUpdateSolution

export interface IAddAnswer {
  answer: IGridItem
  solution: string[]
  grid: GridType
}

export function addAnswer({ answer, solution, grid }: IAddAnswer) {
  const isCorrect = isCorrectAnswer({ answer, solution, grid })
  return isCorrect ? addAsCorrectAnswer(answer) : addAsWrongAnswer(answer)
}

export function restart(): IRestart {
  return {
    type: constants.RESTART,
  }
}

export function updateSolution(solution: string[]): IUpdateSolution {
  return {
    solution,
    type: constants.UPDATE_SOLUTION,
  }
}

interface IRestart {
  type: constants.RESTART
}

interface IUpdateSolution {
  solution: string[]
  type: constants.UPDATE_SOLUTION
}

interface IAddAsCorrectAnswer {
  type: constants.ADD_CORRECT_ANSWER
  item: IGridItem
}

const addAsCorrectAnswer = (answer: IGridItem): IAddAsCorrectAnswer => ({
  item: {
    ...answer,
    status: 'correct',
    updatedAt: new Date(),
  },
  type: constants.ADD_CORRECT_ANSWER,
})

interface IAddAsWrongAnswer {
  type: constants.ADD_WRONG_ANSWER
  item: IGridItem
}

const addAsWrongAnswer = (answer: IGridItem): IAddAsWrongAnswer => ({
  item: {
    ...answer,
    status: 'incorrect',
    updatedAt: new Date(),
  },
  type: constants.ADD_WRONG_ANSWER,
})
