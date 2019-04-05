import * as React from "react";
import "./Grid.css";
import GridItem from "./GridItem";

interface IGridProps {
  children: React.ReactNode;
}

class Grid extends React.Component<IGridProps, object> {
  public static Item: typeof GridItem;
  public render() {
    return <div className="grid">{this.props.children}</div>;
  }
}

export default Grid;
