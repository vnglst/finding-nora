// tslint:disable:no-console
import * as React from 'react'

class Item extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    const { letter, row, column } = this.props
    // console.log('mouseDown', this.props.letter)
    this.props.onPress({ letter, row, column })
  }

  render () {
    const { answer, letter } = this.props
    let classNames = 'item'
    if (answer === 'correct') {
      classNames += ' correct'
    }
    if (answer === 'incorrect') {
      classNames += ' wrong'
    }
    return (
      <div
        className={classNames}
        onMouseDown={this.handleMouseDown}
      >
        <p>{letter}</p>
      </div>
    )
  }
}

export default Item
