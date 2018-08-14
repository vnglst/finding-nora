import { mockMathRandom } from 'utils/mockMathRandom'
import PuzzleGenerator from '../puzzle-generator'

const noise = 'ABCDEFGHIJKLMNOPQRSTVWUXYZ'.split('')
const solution = 'NORA'.toUpperCase().split('')

beforeAll(() => {
  mockMathRandom()
})

// isCorrectAnswer

// didWin

// didLoose

describe('Puzzle', () => {
  it('Should generate a 6 x 6 grid', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    expect(puzzle.grid.length).toEqual(6)
    expect(puzzle.grid[0].length).toEqual(6)
  })
})
