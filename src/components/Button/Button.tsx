import * as React from 'react'
import './Button.css'

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

class Item extends React.Component<IButtonProps, object> {
  constructor(props: IButtonProps) {
    super(props)
  }

  public render() {
    const { className, children, ...other } = this.props
    const classes = 'my-button ' + className
    return (
      <button className={classes} {...other}>
        {children}
      </button>
    )
  }
}

export default Item
