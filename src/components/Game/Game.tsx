import Grid from 'components/UI/Grid'
import * as React from 'react'
import { GridType, IGameState, IGridItem, StatusEnum } from 'types'

interface IAddAnswer {
  answer: IGridItem
  solution: string[]
  grid: GridType
}

interface IGameProps {
  game: IGameState
  addAnswer: ({ answer, solution, grid }: IAddAnswer) => void
}

const Game = ({ game, addAnswer }: IGameProps) => {
  const handlePress = (item: IGridItem) => {
    if (
      item.status === StatusEnum.Correct ||
      item.status === StatusEnum.Wrong
    ) {
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
            wrong={item.status === StatusEnum.Wrong}
            correct={item.status === StatusEnum.Correct}
            almostCorrect={item.status === StatusEnum.AlmostCorrect}
          >
            {item.letter}
          </Grid.Item>
        )),
      )}
    </Grid>
  )
}

export default Game
