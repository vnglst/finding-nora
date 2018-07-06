import cx from 'classnames'
import * as React from 'react'
import './Button.css'

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button = ({ children, className, ...other }: IButtonProps) => (
  <button className={cx('my-button', className)} {...other}>
    {children}
  </button>
)

export default Button
