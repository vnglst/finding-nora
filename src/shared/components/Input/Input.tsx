import cx from 'classnames'
import * as React from 'react'
import './Input.css'

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  className?: string
  valid?: boolean
}

const Input = ({ className, valid, ...other }: IInputProps) => {
  const classes = cx(
    'my-input',
    { valid },
    { invalid: !valid },
    className,
  )
  return <input className={classes} {...other} />
}

export default Input
