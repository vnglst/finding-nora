import * as React from 'react'
import './Item.css'

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
    let className = 'letter-button'
    if (correct) {
      className += ' correct'
    }
    if (incorrect) {
      className += ' wrong'
    }
    return (
      <button className={className} onMouseDown={this.props.onPress}>
        {children}
      </button>
    )
  }
}

export default Item
