import { generateGridWithPuzzle } from '../game-generator'

const tinyPuzzle = {
  noise: 'X'.split(''),
  size: 2,
  solution: 'NOR'.toUpperCase().split(''),
}

const defaultPuzzle = {
  noise: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  size: 5,
  solution: 'NORA'.toUpperCase().split(''),
}

const largePuzzle = {
  noise: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  size: 15,
  solution: 'ABCDEFGHIJKL'.toUpperCase().split(''),
}

it('Should match snapshot for default puzzle', () => {
  const grid = generateGridWithPuzzle(defaultPuzzle)
  expect(grid).toMatchSnapshot()
})

it('Should match snapshot for large puzzle', () => {
  const grid = generateGridWithPuzzle(largePuzzle)
  expect(grid).toMatchSnapshot()
})

it('Should match snapshot for tiny puzzle', () => {
  const grid = generateGridWithPuzzle(tinyPuzzle)
  expect(grid).toMatchSnapshot()
})
