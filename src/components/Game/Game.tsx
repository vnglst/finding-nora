import * as React from 'react'
import Grid from '../Grid'
import Overlay from '../Overlay'
import generateGridWithPuzzle from './gameUtils'
import { IGridItem, isNeighbour } from './gameUtils'

interface IGameProps {
  size: number
  solution: string[]
  noise: string[]
}

interface IGameState {
  answers: IGridItem[]
  grid: IGridItem[][] | null
}

class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this)
    this.allAnswersAreCorrect = this.allAnswersAreCorrect.bind(this)
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
    const youLost = false // !this.allAnswersAreCorrect()

    return (
      <Grid>
        {grid.map((row, rowIndex) =>
          row.map((item, columnIndex) => (
            <Grid.Item
              key={`${rowIndex}-${columnIndex}`}
              onPress={() => this.handlePress(item)}
              incorrect={item.status === 'incorrect'}
              correct={item.status === 'correct'}
            >
              {item.letter}
            </Grid.Item>
          )),
        )}
        {youLost && (
          <Overlay>
            <p>GAME OVER</p>
            <button onMouseDown={this.restartGame}>Play again?</button>
          </Overlay>
        )}
        {youWon && (
          <Overlay>
            <p>YOU WON</p>
            <button onMouseDown={this.restartGame}>Play again?</button>
          </Overlay>
        )}
      </Grid>
    )
  }

  private restartGame() {
    const { size, solution, noise } = this.props
    const grid = generateGridWithPuzzle({ size, solution, noise })
    this.setState({
      answers: [],
      grid,
    })
  }

  private isCorrectAnswer(answer: IGridItem) {
    const { solution } = this.props
    const { answers } = this.state
    const numberOfAnswers = Math.max(answers.length, 0)
    const currentLetter = solution[numberOfAnswers]
    const letterIsCorrect = answer.letter === currentLetter
    const lastAnswer = answers[answers.length - 1]
    const isFirstOrNeighbour = !lastAnswer || isNeighbour(lastAnswer, answer)
    return letterIsCorrect && isFirstOrNeighbour
  }

  private handlePress(answer: IGridItem) {
    const { grid, answers } = this.state
    if (answer.status || !grid) {
      return // already answered
    }
    const status = this.isCorrectAnswer(answer) ? 'correct' : 'incorrect'
    answer.status = status
    grid[answer.row][answer.column].status = status
    this.setState({
      answers: [...answers, answer],
    })
  }

  private allAnswersAreCorrect() {
    const { answers } = this.state
    const wrongAnswers = answers.filter(answer => answer.status !== 'correct')
    return wrongAnswers.length === 0
  }

  private didWin() {
    const { answers } = this.state
    const { solution } = this.props
    const allCorrect = this.allAnswersAreCorrect()
    return solution.length === answers.length && allCorrect
  }
}

export default Game
