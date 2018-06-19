// tslint:disable:no-console
import { GridType, IGridItem } from '../types'
import * as constants from './constants'
import { getCorrectAnswers } from './game-model'

interface ISetGridReturn {
  type: constants.SET_GRID
  grid: GridType
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

export type GameAction = ISetGridReturn | IAddAnswerReturn

export function setGrid(grid: GridType): ISetGridReturn {
  return {
    grid,
    type: constants.SET_GRID,
  }
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

const isCorrectAnswer = ({ answer, solution, grid }: IAddAnswer) => {
  const remainingSolution = getRemainingSolution(solution, grid)
  const currentLetter = remainingSolution[0]
  const letterIsCorrect = answer.letter === currentLetter
  return letterIsCorrect
}

const getRemainingSolution = (solution: string[], grid: GridType) => {
  const correctAnswers = getCorrectAnswers(grid)
  const remainingSolution = solution.filter(
    solutionLetter =>
      correctAnswers.findIndex(answer => answer.letter === solutionLetter) ===
      -1,
  )
  return remainingSolution
}
