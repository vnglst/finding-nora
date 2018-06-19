// tslint:disable:no-console
import * as React from 'react'
import { IGameState, IGridItem } from '../../types'
import Grid from '../grid'

interface IGameProps {
  game: IGameState
}

class Game extends React.Component<IGameProps, object> {
  constructor(props: IGameProps) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  public render() {
    if (!this.props.game.grid) {
      return null // state not loaded yet
    }
    const { grid } = this.props.game
    return (
      <Grid>
        {grid.map((row, rowIndex) =>
          row.map((item, columnIndex) => (
            <Grid.Item
              key={`${rowIndex}-${columnIndex}`}
              onMouseDown={() => this.handlePress(item)}
              onTouchStart={() => this.handlePress(item)}
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

  private handlePress(answer: IGridItem) {
    console.log('pressed', answer)
  }
}

export default Game
