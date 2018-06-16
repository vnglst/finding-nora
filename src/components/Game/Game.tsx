// tslint:disable:no-console
import InfoIcon from '@material-ui/icons/Info'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettinsIcon from '@material-ui/icons/Settings'
import * as React from 'react'
import { loadSounds, playSound } from '../../webAudio/playItNow'
import Button from '../Button'
import Grid from '../grid'
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
  public squakk: any
  public nock: any
  public hooyeah: any
  public restart: any

  constructor(props: IGameProps) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this)
    this.didWin = this.didWin.bind(this)
    this.restartGame = this.restartGame.bind(this)

    const soundsBaseUrl =
      'https://raw.githubusercontent.com/vnglst/finding-nora/master/public/sounds/'

    const soundUrls = [
      soundsBaseUrl + 'squakk.mp3',
      soundsBaseUrl + 'nock.mp3',
      soundsBaseUrl + 'hooyeah.mp3',
      soundsBaseUrl + 'restart.mp3',
    ]

    loadSounds(soundUrls, (bufferList: any) => {
      this.squakk = bufferList[0]
      this.nock = bufferList[1]
      this.hooyeah = bufferList[2]
      this.restart = bufferList[3]
    })
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
              onTouchStart={() => this.handlePress(item)}
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
            <RefreshIcon
              style={{
                fontSize: '28px',
                margin: 0,
                padding: 0,
              }}
            />
            <p className="button-label">Home</p>
          </button>
          <button onMouseDown={this.restartGame}>
            <SettinsIcon
              style={{
                fontSize: '28px',
                margin: 0,
                padding: 0,
              }}
            />
            <p className="button-label">Settings</p>
          </button>
          <button onMouseDown={this.restartGame}>
            <InfoIcon
              style={{
                fontSize: '28px',
                margin: 0,
                padding: 0,
              }}
            />
            <p className="button-label">About</p>
          </button>
        </div>
      </Grid>
    )
  }

  private restartGame() {
    const { size, solution, noise } = this.props
    playSound(this.restart)
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
    if (isCorrect) {
      playSound(this.nock)
    } else {
      playSound(this.squakk)
    }
    answer.status = status
    grid[answer.row][answer.column].status = status
    this.setState({
      answers: [...answers, answer],
      remaining: newRemaining,
    })
  }

  private getTotalCorrectAnswers(answers: IGridItem[]) {
    return answers.filter(answer => answer.status === 'correct').length
  }

  private didWin() {
    const { answers } = this.state
    const { solution } = this.props
    const totalCorrectAnswers = this.getTotalCorrectAnswers(answers)
    const didWin = totalCorrectAnswers >= solution.length
    if (didWin) {
      playSound(this.hooyeah)
    }
    return didWin
  }
}

export default Game
