import * as React from 'react'
import './Button.css'

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button = ({ children, className, ...other }: IButtonProps) => {
  const classes = 'my-button ' + className
  return (
    <button className={classes} {...other}>
      {children}
    </button>
  )
}

export default Button
