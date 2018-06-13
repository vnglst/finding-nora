// tslint:disable:no-console
import RefreshIcon from '@material-ui/icons/Refresh'
import * as React from 'react'
import Button from '../Button'
import Grid from '../Grid'
import Overlay from '../Overlay'
import generateGridWithPuzzle from './gameUtils'
import { IGridItem, itemsAreNeighbours } from './gameUtils'

interface IGameProps {
  size: number
  solution: string[]
  noise: string[]
}

interface IGameState {
  answers: IGridItem[]
  grid: IGridItem[][] | null
  remaining: string[]
}

class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this)
    this.didWin = this.didWin.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  public componentDidMount() {
    this.restartGame()
  }

  public render() {
    if (!this.state || !this.state.grid) {
      return null // state not loaded yet
    }
    const { grid } = this.state
    const youWon = this.didWin()

    return (
      <Grid>
        {grid.map((row, rowIndex) =>
          row.map((item, columnIndex) => (
            <Grid.Item
              key={`${rowIndex}-${columnIndex}`}
              onMouseDown={() => this.handlePress(item)}
              incorrect={item.status === 'incorrect'}
              correct={item.status === 'correct'}
            >
              {item.letter}
            </Grid.Item>
          )),
        )}
        {youWon && (
          <Overlay>
            <p>YOU WON</p>
            <Button onMouseDown={this.restartGame}>Play again?</Button>
          </Overlay>
        )}
        <div className="bottom-bar">
          <button onMouseDown={this.restartGame}>
            <RefreshIcon style={{ fontSize: '48px' }} />
          </button>
        </div>
      </Grid>
    )
  }

  private restartGame() {
    const { size, solution, noise } = this.props
    const grid = generateGridWithPuzzle({ size, solution, noise })
    this.setState({
      answers: [],
      grid,
      remaining: solution,
    })
  }

  private getLastCorrectAnswer(answers: IGridItem[]) {
    const correctAnswers = answers.filter(a => a.status === 'correct')
    if (correctAnswers.length < 1) {
      return undefined
    }
    const lastCorrectAnswer = correctAnswers[correctAnswers.length - 1]
    return lastCorrectAnswer
  }

  private isCorrectAnswer(answer: IGridItem) {
    const { remaining, answers } = this.state
    const currentLetter = remaining[0]
    const letterIsCorrect = answer.letter === currentLetter
    const lastCorrectAnswer = this.getLastCorrectAnswer(answers)
    const isFirstOrNeighbour =
      !lastCorrectAnswer || itemsAreNeighbours(lastCorrectAnswer, answer)
    return letterIsCorrect && isFirstOrNeighbour
  }

  private handlePress(answer: IGridItem) {
    const { grid, answers, remaining } = this.state
    if (answer.status || !grid) {
      return // already answered
    }
    const isCorrect = this.isCorrectAnswer(answer)
    const status = isCorrect ? 'correct' : 'incorrect'
    const newRemaining = isCorrect ? remaining.slice(1) : remaining
    answer.status = status
    grid[answer.row][answer.column].status = status
    this.setState({
      answers: [...answers, answer],
      remaining: newRemaining,
    })
  }

  private allCorrect(answers: IGridItem[]) {
    return answers.findIndex(answer => answer.status !== 'correct') === -1
  }

  private didWin() {
    const { answers } = this.state
    const { solution } = this.props
    const areAllAnswersCorrect = this.allCorrect(answers)
    return solution.length === answers.length && areAllAnswersCorrect
  }
}

export default Game
