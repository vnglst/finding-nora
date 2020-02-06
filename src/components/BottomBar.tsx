import * as React from "react";
import "./BottomBar.css";
import BottomBarItem, { ItemProps } from "./BottomBarItem";

interface Props {
  children: React.ReactNode;
  value: string;
  onChange: (str: string) => void;
}

interface BottomBarSubComponent {
  Item: React.FC<ItemProps>;
}

const BottomBar: React.FC<Props> & BottomBarSubComponent = ({
  children: propChildren,
  value,
  onChange
}: Props) => {
  function generateChildren() {
    return React.Children.map(propChildren, (child, childIndex) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      const childProps = child.props;
      const childValue =
        childProps.value === undefined ? childIndex : childProps.value;

      return React.cloneElement(child, {
        onChange,
        selected: childValue === value,
        value: childValue
      });
    });
  }

  const children = generateChildren();

  return <div className="bottom-bar">{children}</div>;
};

BottomBar.Item = BottomBarItem;

export default BottomBar;
