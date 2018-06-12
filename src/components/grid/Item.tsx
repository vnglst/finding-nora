import * as React from 'react'

const correctStyle = {
  background: '#4ECDC4',
}

const wrongStyle = {
  background: '#FF6B6B',
}

export interface IItemProps {
  children: React.ReactNode
  correct: boolean
  incorrect: boolean
  onPress: () => void
}

class Item extends React.Component<IItemProps, object> {
  constructor(props: IItemProps) {
    super(props)
  }

  public render() {
    const { children, correct, incorrect } = this.props
    let style
    if (correct) {
      style = correctStyle
    }
    if (incorrect) {
      style = wrongStyle
    }
    return (
      <button
        className="letter-button"
        style={style}
        onMouseDown={this.props.onPress}
      >
        {children}
      </button>
    )
  }
}

export default Item
