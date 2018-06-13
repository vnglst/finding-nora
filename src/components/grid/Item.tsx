import * as React from 'react'
// import * as Sound from 'react-sound'
import Button from '../Button'
import './Item.css'

interface IItemProps {
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLElement>>
  children: React.ReactNode
  correct?: boolean
  incorrect?: boolean
}

class Item extends React.Component<IItemProps, object> {
  constructor(props: IItemProps) {
    super(props)
  }

  public render() {
    const { children, correct, incorrect, ...other } = this.props
    let classes = 'grid-item'
    if (correct) {
      classes += ' correct'
    }
    if (incorrect) {
      classes += ' wrong'
    }
    return (
      <Button className={classes} {...other}>
        {children}
      </Button>
    )
  }
}

export default Item
