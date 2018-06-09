// tslint:disable:no-console
import * as React from 'react'

const correctStyle = {
  background: 'green',
  color: 'black'
}

const wrongStyle = {
  background: 'red',
  color: 'black'
}

class Item extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown () {
    const { letter, row, column } = this.props
    this.props.onPress({ letter, row, column })
  }

  render () {
    const { answer, letter } = this.props
    let buttonStyle
    if (answer === 'correct') {
      buttonStyle = correctStyle
    }
    if (answer === 'incorrect') {
      buttonStyle = wrongStyle
    }
    return (
      <wired-button
        style={buttonStyle}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
      >
        {letter}
      </wired-button>
    )
  }
}

export default Item
