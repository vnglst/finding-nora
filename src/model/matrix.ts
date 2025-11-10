// inspired by this article:
// https://medium.com/front-end-hacking/matrix-rotation-%EF%B8%8F-6550397f16ab

const flipMatrix = <T>(matrix: T[][]) =>
  matrix[0].map((_, index) => matrix.map(row => row[index]));

export const mirrorMatrixHorizontally = <T>(matrix: T[][]) =>
  structuredClone(matrix).reverse();

export const mirrorMatrixVertically = <T>(matrix: T[][]) =>
  structuredClone(matrix).map(row => row.reverse());

export const rotateMatrixCounterClockwise = <T>(matrix: T[][]) =>
  mirrorMatrixHorizontally(flipMatrix(matrix));

export const rotateMatrixClockwise = <T>(matrix: T[][]) =>
  flipMatrix(mirrorMatrixHorizontally(matrix));
