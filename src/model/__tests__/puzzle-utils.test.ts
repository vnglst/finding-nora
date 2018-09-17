import { mockMathRandom } from 'test-utils/mockMathRandom'
import { GridType, StatusEnum } from 'types'
import PuzzleGenerator from '../puzzle-generator'
import { didWin, isCorrectAnswer } from '../puzzle-utils'

const noise = 'ABCDEFGHIJKLMNOPQRSTVWUXYZ'.split('')
const solution = 'NORA'.toUpperCase().split('')

// util function
const setAnswerToCorrect = (row: number, column: number, grid: GridType) => {
  grid[row][column] = {
    ...grid[row][column],
    status: StatusEnum.Correct,
    updatedAt: new Date()
  }
}

beforeEach(() => {
  mockMathRandom()
})

describe('isCorrectAnswer()', () => {
  it('Confirm that N at 4 0 is correct answer', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    const isCorrect = isCorrectAnswer({
      answer: puzzle.grid[5][0],
      grid: puzzle.grid,
      solution: puzzle.solution
    })
    expect(isCorrect).toBeTruthy()
  })
  it('Confirm that G at 0 0 is incorrect answer', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    const isCorrect = isCorrectAnswer({
      answer: puzzle.grid[0][0],
      grid: puzzle.grid,
      solution: puzzle.solution
    })
    expect(isCorrect).toBeFalsy()
  })
  it('Confirm that O at 4 0 is correct answer after answering N', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    setAnswerToCorrect(5, 0, puzzle.grid)
    const isCorrect = isCorrectAnswer({
      answer: puzzle.grid[4][0],
      grid: puzzle.grid,
      solution: puzzle.solution
    })
    expect(isCorrect).toBeTruthy()
  })
})

describe('didWin()', () => {
  it('Should confirm player did not win at start', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    expect(didWin(puzzle.solution, puzzle.grid)).toBeFalsy()
  })
  it('Should confirm did win after answering all questions correctly', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    setAnswerToCorrect(4, 0, puzzle.grid)
    setAnswerToCorrect(4, 1, puzzle.grid)
    setAnswerToCorrect(4, 2, puzzle.grid)
    setAnswerToCorrect(3, 2, puzzle.grid)
    expect(didWin(puzzle.solution, puzzle.grid)).toBeTruthy()
  })
})
