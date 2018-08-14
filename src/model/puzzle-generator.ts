import { GridType, IGridItem } from 'types'
import { sample } from 'utils/general'
import {
  mirrorMatrixHorizontally,
  rotateMatrixCounterClockwise,
} from 'utils/matrix'

class PuzzleGenerator {
  public grid: GridType
  public noise: string[]

  constructor(
    readonly size: number,
    readonly solution: string[],
    noise: string[],
  ) {
    this.removeSolutionLettersFrom(noise)
    this.generate()
    this.addPuzzle()
    this.applyRandomTransformation()
  }

  // HACK: to improve gameplay
  public removeSolutionLettersFrom(noise: string[]) {
    this.noise = noise.filter(
      noiseLetter =>
        this.solution.findIndex(
          solutionLetter => solutionLetter === noiseLetter,
        ) === -1,
    )
  }

  public generate() {
    this.grid = []
    for (let row = 0; row < this.size; row++) {
      const columns = []
      for (let column = 0; column < this.size; column++) {
        const randomLetter = sample(this.noise)
        if (randomLetter) {
          columns.push({
            column,
            letter: randomLetter,
            row,
            updatedAt: new Date(),
          })
        }
      }
      this.grid.push(columns)
    }
  }

  public addPuzzle() {
    const { startRow, startColumn } = this.generateLegalRandomStartPoint()
    let currentRow = startRow
    let currentColumn = startColumn
    this.solution.forEach(letter => {
      const legalMoves = this.getLegalNextMoves(currentRow, currentColumn)
      const nextMove = sample(legalMoves)
      this.grid[nextMove.row][nextMove.column] = {
        column: nextMove.column,
        letter,
        row: nextMove.row,
        updatedAt: new Date(),
      }
      currentRow = nextMove.row
      currentColumn = nextMove.column
    })
  }

  public generateLegalRandomStartPoint() {
    this.checkSolutionLength()
    let startRow = this.generateRandomPosition()
    let startColumn = this.generateRandomPosition()
    const requiredSteps = this.solution.length
    let tryAgain = true
    while (tryAgain) {
      const stepsToEdge = this.calculateStepsToEdge(startRow, startColumn)
      if (requiredSteps < stepsToEdge) {
        tryAgain = false
      } else {
        startRow = this.generateRandomPosition()
        startColumn = this.generateRandomPosition()
      }
    }
    return { startRow, startColumn }
  }

  public checkSolutionLength() {
    const stepsToEdgeFromOrigin = this.calculateStepsToEdge(0, 0)
    const requiredSteps = this.solution.length
    if (requiredSteps > stepsToEdgeFromOrigin) {
      throw new Error('Puzzle too long')
    }
  }

  public calculateStepsToEdge(row: number, column: number) {
    const edgeStep = 1
    return this.size - row + this.size - column - edgeStep
  }

  public getLegalNextMoves(row: number, column: number) {
    const legalMoves = []
    if (row + 1 < this.size) {
      legalMoves.push({ row: row + 1, column })
    }
    if (column + 1 < this.size) {
      legalMoves.push({ row, column: column + 1 })
    }
    return legalMoves
  }

  public toString() {
    let s: string = ''
    this.grid.forEach(row => {
      row.forEach(item => {
        s += item.letter
      })
      s += '\n'
    })
    return s
  }

  public find(letter: string) {
    const found: IGridItem[] = []
    this.grid.forEach(row => {
      row.forEach(item => {
        if (item.letter === letter) {
          found.push(item)
        }
      })
    })
    return found
  }

  public applyRandomTransformation() {
    const transformation = sample([
      (g: GridType) => g,
      mirrorMatrixHorizontally,
      rotateMatrixCounterClockwise,
    ])
    this.grid = transformation(this.grid)
    this.updateIndices()
  }

  public updateIndices() {
    this.grid.forEach((columns, row) =>
      columns.map((el, column) => {
        this.grid[row][column] = {
          ...el,
          column,
          row,
        }
      }),
    )
  }

  private generateRandomPosition() {
    return Math.floor(Math.random() * this.size)
  }
}

export default PuzzleGenerator
