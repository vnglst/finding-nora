import {
  mirrorMatrixHorizontally,
  mirrorMatrixVertically,
  rotateMatrixClockwise,
  rotateMatrixCounterClockwise,
} from '../matrix'

const exampleMatrix = [['A', 'B'], ['C', 'D']]

describe('mirrorMatrixHorizontally()', () => {
  it('Should not mutate input array', () => {
    mirrorMatrixHorizontally(exampleMatrix)
    expect(exampleMatrix).toEqual([['A', 'B'], ['C', 'D']])
  })
  it('Should mirror a matrix horizontally', () => {
    const mirrored = mirrorMatrixHorizontally(exampleMatrix)
    expect(mirrored).toEqual([['C', 'D'], ['A', 'B']])
  })
})

describe('mirrorMatrixVertically()', () => {
  it('Should not mutate input array', () => {
    mirrorMatrixVertically(exampleMatrix)
    expect(exampleMatrix).toEqual([['A', 'B'], ['C', 'D']])
  })
  it('Should mirror a matrix vertically', () => {
    const mirrored = mirrorMatrixVertically(exampleMatrix)
    expect(mirrored).toEqual([['B', 'A'], ['D', 'C']])
  })
})

describe('rotateMatrixClockwise()', () => {
  it('Should not mutate input array', () => {
    rotateMatrixClockwise(exampleMatrix)
    expect(exampleMatrix).toEqual([['A', 'B'], ['C', 'D']])
  })
  it('Should rotate a matrix once', () => {
    const rotated = rotateMatrixClockwise(exampleMatrix)
    expect(rotated).toEqual([['C', 'A'], ['D', 'B']])
  })
  it('Should rotate a matrix twice', () => {
    const rotated = rotateMatrixClockwise(rotateMatrixClockwise(exampleMatrix))
    expect(rotated).toEqual([['D', 'C'], ['B', 'A']])
  })
  it('Should rotate a matrix thrice', () => {
    const rotated = rotateMatrixClockwise(
      rotateMatrixClockwise(rotateMatrixClockwise(exampleMatrix)),
    )
    expect(rotated).toEqual([['B', 'D'], ['A', 'C']])
  })
  it('Should rotate a matrix four times', () => {
    const rotated = rotateMatrixClockwise(
      rotateMatrixClockwise(
        rotateMatrixClockwise(rotateMatrixClockwise(exampleMatrix)),
      ),
    )
    expect(rotated).toEqual(exampleMatrix)
  })
})

describe('rotateMatrixCounterClockwise()', () => {
  it('Should rotate a matrix counter clockwise once', () => {
    const rotated = rotateMatrixCounterClockwise(exampleMatrix)
    expect(rotated).toEqual([['B', 'D'], ['A', 'C']])
  })
})
