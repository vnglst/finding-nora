import * as React from 'react'

const correctStyle = {
  background: '#4ECDC4',
}

const wrongStyle = {
  background: '#FF6B6B',
}

export interface InterfaceItemProps {
  letter: string
  row: number
  column: number
  answer: string
  onPress: (
    { letter, row, column }: { letter: string; row: number; column: number },
  ) => void
}

class Item extends React.Component<InterfaceItemProps, object> {
  constructor(props: InterfaceItemProps) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  public handleMouseDown() {
    const { letter, row, column } = this.props
    this.props.onPress({ letter, row, column })
  }

  public render() {
    const { answer, letter } = this.props
    let style
    if (answer === 'correct') {
      style = correctStyle
    }
    if (answer === 'incorrect') {
      style = wrongStyle
    }
    return (
      <button
        className="letter-button"
        style={style}
        onMouseDown={this.handleMouseDown}
      >
        {letter}
      </button>
    )
  }
}

export default Item
