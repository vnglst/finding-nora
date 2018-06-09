// tslint:disable:no-console
// import * as _ from 'lodash'
import * as React from 'react'
import Item from './Item'
import generateGridWithPuzzle from './gridUtils'

class Grid extends React.Component {
  constructor (props) {
    super(props)
    const { size, solution, noise } = props
    const grid = generateGridWithPuzzle({ size, solution, noise })
    this.state = {
      answers: [],
      gameOver: false,
      grid
    }
    this.handlePress = this.handlePress.bind(this)
    this.getAnswerStatus = this.getAnswerStatus.bind(this)
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this)
    this.isNeighbourOfPrevAnswer = this.isNeighbourOfPrevAnswer.bind(
      this,
    )
  }

  isNeighbourOfPrevAnswer ({ column, row }) {
    const { answers } = this.state
    if (answers.length === 0) { // first answer is always a neighbour
      return true
    }
    const prevAnswer = answers[0]
    return (prevAnswer.column === column && Math.abs(prevAnswer.row - row) <= 1) ||
      (prevAnswer.row === row && Math.abs(prevAnswer.column - column) <= 1)
  }

  isCorrectAnswer ({ letter, column, row }) {
    const { solution } = this.props
    const { answers } = this.state
    const nextLetter = solution[answers.length]
    const letterIsCorrect = letter === nextLetter
    const isNeighbour = this.isNeighbourOfPrevAnswer({ column, row })
    return letterIsCorrect && isNeighbour
  }

  handlePress ({ letter, column, row }) {
    const { answers } = this.state
    const isCorrectAnswer = this.isCorrectAnswer({ letter, column, row })
    const status = isCorrectAnswer ? 'correct' : 'incorrect'
    this.setState({
      answers: [{ column, row, letter, status }, ...answers],
      gameOver: !isCorrectAnswer
    })
  }

  getAnswerStatus ({ column, row }) {
    const { answers } = this.state
    const foundAnswer = answers.find(
      answer => answer.column === column && answer.row === row,
    )
    return foundAnswer ? foundAnswer.status : undefined
  }

  render () {
    const { grid, gameOver, answers } = this.state
    const { solution } = this.props
    const youWon = solution.length === answers.length

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
        {gameOver && (
          <div>
            <p>Game over</p>
          </div>
        )}
        {youWon && (
        <div>
          <p>You won!!</p>
        </div>
        )}
      </div>
    )
  }
}

export default Grid
