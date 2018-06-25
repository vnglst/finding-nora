import * as React from 'react'
import Button from '../UI/Button'
import './Item.css'

interface IItemProps {
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLElement>>
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>
  children: React.ReactNode
  correct?: boolean
  wrong?: boolean
  almostCorrect?: boolean
}

class Item extends React.Component<IItemProps, object> {
  constructor(props: IItemProps) {
    super(props)
  }

  public render() {
    const { children, correct, wrong, almostCorrect, ...other } = this.props
    let classes = 'grid-item'
    if (correct) {
      classes += ' correct'
    }
    if (wrong) {
      classes += ' wrong'
    }
    if (almostCorrect) {
      classes += ' almost-correct'
    }
    return (
      <Button className={classes} {...other}>
        {children}
      </Button>
    )
  }
}

export default Item
