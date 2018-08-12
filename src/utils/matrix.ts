// inspired by this article:
// https://medium.com/front-end-hacking/matrix-rotation-%EF%B8%8F-6550397f16ab

import { cloneDeep, compose } from './general'

const flipMatrix = (matrix: any[][]) =>
  matrix[0].map((column: any, index) => matrix.map((row: any) => row[index]))

export const mirrorMatrixHorizontally = (matrix: any[][]) =>
  cloneDeep(matrix).reverse()

export const mirrorMatrixVertically = (matrix: any[][]) =>
  cloneDeep(matrix).map((row: any) => row.reverse())

export const rotateMatrixCounterClockwise = compose(
  mirrorMatrixHorizontally,
  flipMatrix,
)

export const rotateMatrixClockwise = compose(
  flipMatrix,
  mirrorMatrixHorizontally,
)
