// tslint:disable:no-console
import * as _ from 'lodash'

const generateGrid = ({ size, noise }) => {
  const grid = []
  for (let row = 0; row < size; row++) {
    const columns = []
    for (let column = 0; column < size; column++) {
      const randomLetter = _.sample(noise)
      columns.push({
        letter: randomLetter
      })
    }
    grid.push(columns)
  }
  return grid
}

const getAllMoves = ({ grid }) => {
  const legalMoves = []
  const size = grid.length
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      legalMoves.push({ row, column })
    }
  }
  return legalMoves
}

const getLegalNextMoves = ({ grid, row, column }) => {
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

const addPuzzle = ({ grid, row, column, solution }) => {
  const clonedGrid = _.cloneDeep(grid)
  const legalMoves = getLegalNextMoves({ grid: clonedGrid, row, column })
  if (solution.length === 0) {
    return clonedGrid
  }
  if (legalMoves.length === 0) {
    // console.log('failed attempt')
    return undefined
  }
  const nextLetter = solution[0]
  const nextMove = _.sample(legalMoves)
  // console.log('next letter', nextLetter, nextMove)
  clonedGrid[nextMove.row][nextMove.column] = {
    letter: nextLetter
  }
  const remainingSolution = solution.slice(1)

  const gridWithPuzzle = addPuzzle({
    column: nextMove.column,
    grid: clonedGrid,
    row: nextMove.row,
    solution: remainingSolution
  })

  // could not add complete puzzle, go back up in recursion tree and start over
  if (!gridWithPuzzle) {
    if (column === undefined) {
      return addPuzzle({ grid, solution })
    }
    return undefined
  }

  return gridWithPuzzle
}

const generateGridWithPuzzle = ({ size, solution, noise }) => {
  const grid = generateGrid({ size, noise })
  const gridWithPuzzle = addPuzzle({ grid, solution })
  return gridWithPuzzle
}

export default generateGridWithPuzzle
