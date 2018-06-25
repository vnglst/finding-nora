import * as React from 'react'
import './Grid.css'
import Item from './Item'

interface IGridProps {
  children: React.ReactNode
}

class Grid extends React.Component<IGridProps, object> {
  public static Item: typeof Item
  public render() {
    return <div className="grid">{this.props.children}</div>
  }
}

export default Grid
