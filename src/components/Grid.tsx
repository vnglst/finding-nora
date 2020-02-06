import * as React from "react";
import "./Grid.css";
import GridItem, { GridItemProps } from "./GridItem";

interface Props {
  children: React.ReactNode;
}
interface GridSubComponents {
  Item: React.FC<GridItemProps>;
}

const Grid: React.FC<Props> & GridSubComponents = ({ children }: Props) => {
  return <div className="grid">{children}</div>;
};

Grid.Item = GridItem;

export default Grid;
