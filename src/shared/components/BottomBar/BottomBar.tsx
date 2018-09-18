import * as React from 'react'
import './BottomBar.css'
import BottomBarItem from './BottomBarItem'

interface IBottomBarProps {
  children: React.ReactNode
  value: string
  onChange: any
}

class BottomBar extends React.Component<IBottomBarProps, object> {
  public static Item: typeof BottomBarItem
  public render() {
    const children = this.generateChildren()
    return <div className="bottom-bar">{children}</div>
  }

  private generateChildren() {
    const { children: childrenProp, value, onChange } = this.props
    return React.Children.map(childrenProp, (child, childIndex) => {
      if (!React.isValidElement(child)) {
        return null
      }
      const childProps = child.props as any
      const childValue =
        childProps.value === undefined ? childIndex : childProps.value

      return React.cloneElement(child as any, {
        onChange,
        selected: childValue === value,
        value: childValue,
      })
    })
  }
}

export default BottomBar
