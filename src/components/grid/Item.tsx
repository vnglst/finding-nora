import * as React from 'react'
import { IGridItem } from '../Game/gameUtils'

const correctStyle = {
  background: '#4ECDC4',
}

const wrongStyle = {
  background: '#FF6B6B',
}

export interface IItemProps {
  item: IGridItem,
  onPress: (
    { letter, row, column }: { letter: string; row: number; column: number },
  ) => void
}

class Item extends React.Component<IItemProps, object> {
  constructor(props: IItemProps) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  public handleMouseDown() {
    this.props.onPress(this.props.item)
  }

  public render() {
    const { item } = this.props
    let style
    if (item.status === 'correct') {
      style = correctStyle
    }
    if (item.status === 'incorrect') {
      style = wrongStyle
    }
    return (
      <button
        className="letter-button"
        style={style}
        onMouseDown={this.handleMouseDown}
      >
        {item.letter}
      </button>
    )
  }
}

export default Item
