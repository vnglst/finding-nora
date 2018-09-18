import { mockMathRandom } from 'shared/test-utils/mockMathRandom'
import PuzzleGenerator from '../puzzle-generator'

const noise = 'ABCDEFGHIJKLMNOPQRSTVWUXYZ'.split('')
const solution = 'NORA'.toUpperCase().split('')

beforeEach(() => {
  mockMathRandom()
})

describe('Puzzle', () => {
  it('Should generate a 6 x 6 grid', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    expect(puzzle.grid.length).toEqual(6)
    expect(puzzle.grid[0].length).toEqual(6)
  })
  it('Should contain all solution letters', () => {
    const puzzle = new PuzzleGenerator(4, solution, noise)
    solution.forEach(letter => {
      expect(puzzle.find(letter)).toBeTruthy()
    })
  })
  it('Should not contain solution letters twice', () => {
    const puzzle = new PuzzleGenerator(8, solution, noise)
    solution.forEach(letter => {
      expect(puzzle.find(letter).length).toBeLessThan(2)
    })
  })
  it('Should be able to generate a puzzle with a solution of max 9 letters', () => {
    const puzzle = new PuzzleGenerator(5, 'ABCDEFGHI'.split(''), noise)
    solution.forEach(letter => {
      expect(puzzle.find(letter)).toBeTruthy()
    })
  })
  it('Should match snapshot for large puzzle', () => {
    const puzzle = new PuzzleGenerator(8, solution, noise)
    expect(puzzle.grid).toMatchSnapshot()
  })
})

describe('removeSolutionLettersFrom()', () => {
  const puzzle = new PuzzleGenerator(6, solution, noise)
  puzzle.removeSolutionLettersFrom('NORABCD'.split(''))
  expect(puzzle.noise).toEqual(['B', 'C', 'D'])
})

describe('calculateStepsToEdge()', () => {
  it('Should calculate steps to edge start at origin', () => {
    const puzzle = new PuzzleGenerator(5, solution, noise)
    const steps = puzzle.calculateStepsToEdge(0, 0)
    expect(steps).toEqual(9)
  })
  it('Should calculate steps to edge start at center', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    const steps = puzzle.calculateStepsToEdge(2, 2)
    expect(steps).toEqual(7)
  })
})

describe('generateLegalRandomStartPoint()', () => {
  it('Should generate a legal random startpoint', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    const startPoint = puzzle.generateLegalRandomStartPoint()
    expect(typeof startPoint.startColumn).toEqual('number')
    expect(typeof startPoint.startRow).toEqual('number')
  })
  it('Should throw error if puzzle cannot be added', () => {
    expect(() => {
      const puzzle = new PuzzleGenerator(5, 'ABCDEFGHIJ'.split(''), noise)
      puzzle.generateLegalRandomStartPoint()
    }).toThrowError('Puzzle too long')
  })
})

describe('updateIndices()', () => {
  it('Should update column and rows after changes', () => {
    const puzzle = new PuzzleGenerator(6, solution, noise)
    puzzle.grid[1][1].column = 2
    puzzle.grid[1][1].row = 2
    puzzle.updateIndices()
    expect(puzzle.grid[1][1].column).toEqual(1)
    expect(puzzle.grid[1][1].row).toEqual(1)
  })
})

describe('applyTransformations()', () => {
  it('Should do nothing on first tranformation', () => {
    const puzzle = new PuzzleGenerator(4, solution, noise)
    const before = puzzle.toString()
    puzzle.applyRandomTransformation()
    const after = puzzle.toString()
    expect(after).toEqual(before)
  })

  it('Should rotate counterclockwise on second tranformation', () => {
    const puzzle = new PuzzleGenerator(4, solution, noise)
    puzzle.applyRandomTransformation()
    puzzle.applyRandomTransformation()
    const str = puzzle.toString()
    expect(str.startsWith('DKLA')).toBeTruthy()
  })

  it('Should mirror horizontally on third tranformation', () => {
    const puzzle = new PuzzleGenerator(4, solution, noise)
    puzzle.applyRandomTransformation()
    puzzle.applyRandomTransformation()
    puzzle.applyRandomTransformation()
    const str = puzzle.toString()
    expect(str.endsWith('DKLA\n')).toBeTruthy()
  })
})
