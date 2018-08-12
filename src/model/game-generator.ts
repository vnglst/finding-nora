import { GridType } from 'types'
import { cloneDeep, compose, sample } from 'utils/general'
import {
  mirrorMatrixHorizontally,
  rotateMatrixCounterClockwise,
} from 'utils/matrix'

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
  const gridWithPuzzle = addPuzzle({ grid, solution }) as GridType
  const transformations = [
    noTransform,
    mirrorGridHorizontal,
    (g: GridType) => rotate(g),
  ]
  const transformedGridWithPuzzle = applyRandomTransformation(
    transformations,
    gridWithPuzzle,
  )
  return transformedGridWithPuzzle
}

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
      const randomLetter = sample(noise)
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

  const clonedGrid = cloneDeep(grid)
  const legalMoves = getLegalNextMoves({ grid: clonedGrid, row, column })
  const nextMove = sample(legalMoves)
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

const applyRandomTransformation = (
  transformations: Array<(grid: GridType) => void>,
  grid: GridType,
) => {
  const transformation = sample(transformations)
  return transformation(grid)
}

// updates indices grid
const updateRowsAndColumns = (grid: GridType) => {
  return grid.map((columns, row) =>
    columns.map((el, column) => {
      return {
        ...el,
        column,
        row,
      }
    }),
  )
}

// do nothing
const noTransform = (grid: GridType) => grid

// mirrors grid horizontally
const mirrorGridHorizontal = compose(
  updateRowsAndColumns,
  mirrorMatrixHorizontally,
)

// rotates grid counterclockwise
const rotate = compose(
  updateRowsAndColumns,
  rotateMatrixCounterClockwise,
)
