// tslint:disable:no-console
import * as _ from 'lodash'

interface InterfaceItem {
  letter: string
}

const generateGrid = ({
  size,
  noise,
}: {
  size: number
  noise: string[]
}): InterfaceItem[][] => {
  const grid = []
  for (let row = 0; row < size; row++) {
    const columns = []
    for (let column = 0; column < size; column++) {
      const randomLetter = _.sample(noise)
      if (randomLetter) {
        columns.push({
          letter: randomLetter,
        })
      }
    }
    grid.push(columns)
  }
  return grid
}

const getAllMoves = ({ grid }: { grid: InterfaceItem[][] }) => {
  const legalMoves = []
  const size = grid.length
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      legalMoves.push({ row, column })
    }
  }
  return legalMoves
}

const getLegalNextMoves = ({
  grid,
  row,
  column,
}: {
  grid: InterfaceItem[][]
  row?: number
  column?: number
}) => {
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

interface InterfaceAddPuzzle {
  grid: InterfaceItem[][]
  row?: number
  column?: number
  solution: string[]
}

const addPuzzle = ({ grid, row, column, solution }: InterfaceAddPuzzle): InterfaceItem[][] | null => {
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
    letter: nextLetter,
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

interface InterfaceGenerateGridWithPuzzle {
  size: number
  solution: string[]
  noise: string[]
}

const generateGridWithPuzzle = ({
  size,
  solution,
  noise,
}: InterfaceGenerateGridWithPuzzle) => {
  const grid = generateGrid({ size, noise })
  const gridWithPuzzle = addPuzzle({ grid, solution })
  return gridWithPuzzle
}

export default generateGridWithPuzzle
