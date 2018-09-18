import cx from 'classnames'
import * as React from 'react'
import Button from '../Button'
import './GridItem.css'

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
  const classes = cx(
    'grid-item',
    { correct },
    { wrong },
    { 'almost-correct': almostCorrect }
  )
  return (
    <Button className={classes} {...other}>
      {children}
    </Button>
  )
}

export default Item
