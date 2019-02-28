import { GridType, IGridItem, StatusEnum } from 'src/finding-words/types'

interface ICorrectAnswer {
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

export const getRemainingSolution = (solution: string[], grid: GridType) => {
  const correctAnswers = getCorrectAnswers(grid)
  const numberOfCorrectAnswers = correctAnswers.length
  const remainingSolution = solution.slice(numberOfCorrectAnswers)
  return remainingSolution
}

const getCorrectAnswers = (grid: GridType) => {
  const answers = getAnswers(grid)
  return answers.filter(answer => answer.status === StatusEnum.Correct)
}

const getAnswers = (grid: GridType) => {
  const answers: IGridItem[] = []
  grid.forEach(row =>
    row.forEach(column => {
      if (column.status) {
        answers.push(column)
      }
    })
  )
  return sortAnswers(answers)
}

const sortAnswers = (answers: IGridItem[]) =>
  answers.sort(
    (answer1, answer2) =>
      answer1.updatedAt.getTime() - answer2.updatedAt.getTime()
  )

const getLastCorrectAnswer = (grid: GridType) => {
  const correctAnswers = getCorrectAnswers(grid)
  if (correctAnswers.length < 1) {
    return undefined
  }
  const lastCorrectAnswer = correctAnswers[correctAnswers.length - 1]
  return lastCorrectAnswer
}

const itemsAreNeighbours = (item1: IGridItem, item2: IGridItem) =>
  (item1.column === item2.column && Math.abs(item1.row - item2.row) <= 1) ||
  (item1.row === item2.row && Math.abs(item1.column - item2.column) <= 1)

export const isCorrectLetter = ({ answer, solution, grid }: ICorrectAnswer) => {
  const remainingSolution = getRemainingSolution(solution, grid)
  return remainingSolution.findIndex(letter => answer.letter === letter) > -1
}

export const didWin = (solution: string[], grid: GridType): boolean => {
  const correctAnswers = getCorrectAnswers(grid)
  return correctAnswers.length >= solution.length
}

export const didLoose = (solution: string[], grid: GridType): boolean => {
  const notAnswered = getNotAnswered(grid)
  return notAnswered.length === 0 && !didWin(solution, grid)
}

const getNotAnswered = (grid: GridType) => {
  const notAnswered: IGridItem[] = []
  grid.forEach(row =>
    row.forEach(column => {
      if (!column.status) {
        notAnswered.push(column)
      }
    })
  )
  return notAnswered
}
