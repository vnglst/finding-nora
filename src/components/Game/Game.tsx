// tslint:disable:no-console
import * as React from 'react'
import { GridType, IGameState, IGridItem } from '../../types'
import Grid from '../Grid'

export interface IAddAnswer {
  answer: IGridItem
  solution: string[]
  grid: GridType
}

export interface IGameProps {
  game: IGameState
  addAnswer: ({ answer, solution, grid }: IAddAnswer) => void
}

function Game({ game, addAnswer }: IGameProps) {
  if (!game.grid) {
    return null // not loaded yet
  }

  const handlePress = (item: IGridItem) => {
    if (item.status) {
      return // already answered
    }
    addAnswer({ answer: item, solution: game.solution, grid: game.grid })
  }

  const { grid } = game
  return (
    <Grid>
      {grid.map((row, rowIndex) =>
        row.map((item, columnIndex) => (
          <Grid.Item
            key={`${rowIndex}-${columnIndex}`}
            onMouseDown={() => handlePress(item)}
            onTouchStart={() => handlePress(item)}
            incorrect={item.status === 'incorrect'}
            correct={item.status === 'correct'}
          >
            {item.letter}
          </Grid.Item>
        )),
      )}
    </Grid>
  )
}

export default Game
