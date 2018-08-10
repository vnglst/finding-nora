import { generateGridWithPuzzle } from '../game-generator'

const SOLUTION = (name || 'NORA').toUpperCase().split('')
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

it('Generated grid should match snapshot', () => {
  const grid = generateGridWithPuzzle({
    noise: NOISE.filter(l => l !== SOLUTION[0]), // remove first letter of solution from noise array to improve gameplay
    size: 5,
    solution: SOLUTION,
  })
  expect(grid).toMatchSnapshot()
})
