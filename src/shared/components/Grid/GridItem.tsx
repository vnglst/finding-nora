import cx from 'classnames'
import * as React from 'react'
import Button from '../Button'
import './GridItem.css'

interface Props {
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLElement>>
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>
  children?: React.ReactNode
  falldown?: boolean
  slideouttop?: boolean
  green?: boolean
  red?: boolean
  orange?: boolean
  className?: string
  style?: object
}

const Item = ({
  children,
  green,
  orange,
  red,
  falldown,
  slideouttop,
  className,
  ...other
}: Props) => {
  const classes = cx(
    'grid-item',
    { falldown },
    { slideouttop },
    { red },
    { green },
    { orange },
    { className }
  )
  return (
    <Button className={classes} {...other}>
      {children}
    </Button>
  )
}

export default Item
