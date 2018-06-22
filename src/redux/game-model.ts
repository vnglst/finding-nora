// tslint:disable:no-console
import * as _ from 'lodash'

export interface IGridItem {
  column: number
  letter: string
  row: number
  status?: string
  updatedAt: Date
}

export type GridType = IGridItem[][]

export const generateGridWithPuzzle = ({
  size,
  solution,
  noise,
}: {
  size: number
  solution: string[]
  noise: string[]
}) => {
  const grid = generateGrid({ size, noise })
  const gridWithPuzzle = addPuzzle({ grid, solution })
  return gridWithPuzzle as GridType
}

export const itemsAreNeighbours = (item1: IGridItem, item2: IGridItem) =>
  (item1.column === item2.column && Math.abs(item1.row - item2.row) <= 1) ||
  (item1.row === item2.row && Math.abs(item1.column - item2.column) <= 1)

export const getAnswers = (grid: GridType) => {
  const answers: IGridItem[] = []
  grid.forEach(row =>
    row.forEach(column => {
      if (column.status) {
        answers.push(column)
      }
    }),
  )
  return sortAnswers(answers)
}

export const getCorrectAnswers = (grid: GridType) => {
  const answers = getAnswers(grid)
  return answers.filter(answer => answer.status === 'correct')
}

export const getWrongAnswers = (grid: GridType) => {
  const answers = getAnswers(grid)
  return answers.filter(answer => answer.status === 'incorrect')
}

export interface ICorrectAnswer {
  answer: IGridItem
  solution: string[]
  grid: GridType
}

export const isCorrectAnswer = ({ answer, solution, grid }: ICorrectAnswer) => {
  const remainingSolution = getRemainingSolution(solution, grid)
  const currentLetter = remainingSolution[0]
  const letterIsCorrect = answer.letter === currentLetter
  const lastCorrectAnswer = getLastCorrectAnswer(grid)
  const isFirstAnswerOrNeighbour =
    !lastCorrectAnswer || itemsAreNeighbours(lastCorrectAnswer, answer)
  return letterIsCorrect && isFirstAnswerOrNeighbour
}

export const didWin = (solution: string[], grid: GridType): boolean => {
  const correctAnswers = getCorrectAnswers(grid)
  return correctAnswers.length >= solution.length
}

const getNotAnswered = (grid: GridType) => {
  const notAnswered: IGridItem[] = []
  grid.forEach(row =>
    row.forEach(column => {
      if (!column.status) {
        notAnswered.push(column)
      }
    }),
  )
  return notAnswered
}

export const didLoose = (solution: string[], grid: GridType): boolean => {
  const notAnswered = getNotAnswered(grid)
  return notAnswered.length === 0 && !didWin(solution, grid)
}

const getLastCorrectAnswer = (grid: GridType) => {
  const correctAnswers = getCorrectAnswers(grid)
  if (correctAnswers.length < 1) {
    return undefined
  }
  const lastCorrectAnswer = correctAnswers[correctAnswers.length - 1]
  return lastCorrectAnswer
}

const getRemainingSolution = (solution: string[], grid: GridType) => {
  const correctAnswers = getCorrectAnswers(grid)
  const numberOfCorrectAnswers = correctAnswers.length
  const remainingSolution = solution.slice(numberOfCorrectAnswers)
  return remainingSolution
}

const sortAnswers = (answers: IGridItem[]) =>
  answers.sort(
    (answer1, answer2) =>
      answer1.updatedAt.getTime() - answer2.updatedAt.getTime(),
  )

const generateGrid = ({
  size,
  noise,
}: {
  size: number
  noise: string[]
}): GridType => {
  const grid = []
  for (let row = 0; row < size; row++) {
    const columns = []
    for (let column = 0; column < size; column++) {
      const randomLetter = _.sample(noise)
      if (randomLetter) {
        columns.push({
          column,
          letter: randomLetter,
          row,
          updatedAt: new Date(),
        })
      }
    }
    grid.push(columns)
  }
  return grid
}

const getAllMoves = ({ grid }: { grid: GridType }) => {
  const legalMoves = []
  const size = grid.length
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      legalMoves.push({ row, column })
    }
  }
  return legalMoves
}

interface IGetLegalNextMoves {
  grid: GridType
  row?: number
  column?: number
}

const getLegalNextMoves = ({ grid, row, column }: IGetLegalNextMoves) => {
  if (row === undefined || column === undefined) {
    return getAllMoves({ grid })
  }
  const legalMoves = []
  const size = grid.length
  if (row + 1 < size) {
    legalMoves.push({ row: row + 1, column })
  }
  if (column + 1 < size) {
    legalMoves.push({ row, column: column + 1 })
  }
  return legalMoves
}

interface IAddPuzzle {
  grid: GridType
  row?: number
  column?: number
  solution: string[]
}

const addPuzzle = ({
  grid,
  row,
  column,
  solution,
}: IAddPuzzle): GridType | null => {
  // all solutions added to grid, stopping
  if (solution.length < 1) {
    return grid
  }

  const clonedGrid = _.cloneDeep(grid)
  const legalMoves = getLegalNextMoves({ grid: clonedGrid, row, column })
  const nextMove = _.sample(legalMoves)
  if (!nextMove) {
    // no possible next move found, could not completely add puzzle
    return null
  }

  const nextLetter = solution[0]
  clonedGrid[nextMove.row][nextMove.column] = {
    column: nextMove.column,
    letter: nextLetter,
    row: nextMove.row,
    updatedAt: new Date(),
  }

  const remainingSolution = solution.slice(1)
  const gridWithPuzzle = addPuzzle({
    column: nextMove.column,
    grid: clonedGrid,
    row: nextMove.row,
    solution: remainingSolution,
  })

  // could not add complete puzzle, go back up in recursion tree and start over
  if (!gridWithPuzzle) {
    if (column === undefined) {
      return addPuzzle({ grid, solution })
    }
    return null
  }

  return gridWithPuzzle
}
