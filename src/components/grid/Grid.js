import * as React from 'react'
import Item from './Item'
import generateGridWithPuzzle from './gridUtils'
import Overlay from '../Overlay'

class Grid extends React.Component {
  constructor (props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.getAnswerStatus = this.getAnswerStatus.bind(this)
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this)
    this.getLastAnswer = this.getLastAnswer.bind(this)
    this.allAnswersAreCorrect = this.allAnswersAreCorrect.bind(this)
    this.didWin = this.didWin.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  componentDidMount () {
    this.restartGame()
  }

  restartGame () {
    const { size, solution, noise } = this.props
    const grid = generateGridWithPuzzle({ size, solution, noise })
    this.setState({
      answers: [],
      grid
    })
  }

  getLastAnswer () {
    const { answers } = this.state
    if (answers.length === 0) {
      return undefined // no answers yet
    }
    return answers[answers.length - 1]
  }

  isNeighbourOfLastAnswer ({ column, row }) {
    const lastAnswer = this.getLastAnswer()
    if (!lastAnswer) {
      // first answer, no need to check neighbours
      return true
    }
    return (
      (lastAnswer.column === column && Math.abs(lastAnswer.row - row) <= 1) ||
      (lastAnswer.row === row && Math.abs(lastAnswer.column - column) <= 1)
    )
  }

  isCorrectAnswer ({ letter, column, row }) {
    const { solution } = this.props
    const { answers } = this.state
    const numberOfAnswers = Math.max(answers.length, 0)
    const currentLetter = solution[numberOfAnswers]
    const letterIsCorrect = letter === currentLetter
    const isNeighbour = this.isNeighbourOfLastAnswer({ column, row })
    return letterIsCorrect && isNeighbour
  }

  isSameAnswer ({ letter, column, row }) {
    const lastAnswer = this.getLastAnswer()
    if (!lastAnswer) {
      return false // first answer, so not the same
    }
    return (
      lastAnswer.letter === letter &&
      lastAnswer.column === column &&
      lastAnswer.row === row
    )
  }

  handlePress ({ letter, column, row }) {
    if (this.isSameAnswer({ letter, column, row })) {
      return // ignore if the same answer is given twice
    }
    const { answers } = this.state
    const isCorrectAnswer = this.isCorrectAnswer({ letter, column, row })
    const status = isCorrectAnswer ? 'correct' : 'incorrect'
    this.setState({
      answers: [...answers, { column, row, letter, status }]
    })
  }

  getAnswerStatus ({ column, row }) {
    const { answers } = this.state
    const foundAnswer = answers.find(
      answer => answer.column === column && answer.row === row,
    )
    return foundAnswer ? foundAnswer.status : undefined
  }

  allAnswersAreCorrect () {
    const { answers } = this.state
    const wrongAnswers = answers.filter(answer => answer.status !== 'correct')
    return wrongAnswers.length === 0
  }

  didWin () {
    const { answers } = this.state
    const { solution } = this.props
    const allCorrect = this.allAnswersAreCorrect()
    return solution.length === answers.length && allCorrect
  }

  didLoose () {
    const allCorrect = this.allAnswersAreCorrect()
    return !allCorrect
  }

  render () {
    if (!this.state) {
      return null // state not loaded yet
    }
    const { grid } = this.state
    const youWon = this.didWin()
    const youLost = this.didLoose()

    return (
      <div className='grid'>
        {grid.map((row, rowIndex) =>
          row.map((item, columnIndex) => (
            <Item
              key={`${rowIndex}-${columnIndex}`}
              onPress={this.handlePress}
              letter={item.letter}
              row={rowIndex}
              column={columnIndex}
              answer={this.getAnswerStatus({
                column: columnIndex,
                letter: item.letter,
                row: rowIndex
              })}
            />
          )),
        )}
        {youLost && (
          <Overlay>
            <p>😿</p>
            <button onMouseDown={this.restartGame}>Play again?</button>
          </Overlay>
        )}
        {youWon && (
          <Overlay>
            <p>😼</p>
            <button onMouseDown={this.restartGame}>Play again?</button>
          </Overlay>
        )}
      </div>
    )
  }
}

export default Grid
