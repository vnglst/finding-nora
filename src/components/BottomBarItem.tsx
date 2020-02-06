import cx from "classnames";
import * as React from "react";
import "./BottomBarItem.css";

export interface ItemProps {
  value: string;
  onChange?: (value: string) => void;
  selected?: boolean;
  icon: React.ReactNode;
  label?: string;
}

export default function BottomBarItem({
  value,
  label,
  onChange = () => {},
  icon,
  selected,
  ...other
}: ItemProps) {
  const classes = cx("item", { "item-selected": selected });
  return (
    <button className={classes} onMouseDown={() => onChange(value)} {...other}>
      {icon}
      {label && <p>{label}</p>}
    </button>
  );
}
