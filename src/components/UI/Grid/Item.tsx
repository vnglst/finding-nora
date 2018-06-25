import * as React from 'react'
import Button from '../Button'
import './Item.css'

interface IItemProps {
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLElement>>
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>
  children: React.ReactNode
  correct?: boolean
  wrong?: boolean
  almostCorrect?: boolean
}

const Item = ({
  children,
  correct,
  wrong,
  almostCorrect,
  ...other
}: IItemProps) => {
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

export default Item
