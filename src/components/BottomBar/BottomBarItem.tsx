import cx from "classnames";
import * as React from "react";
import "./BottomBarItem.css";

interface IBottomBarItemProps {
  value: string;
  onChange?: any;
  selected?: boolean;
  icon: React.ReactNode;
  label?: string;
}

const BottomBarItem = ({
  value,
  label,
  onChange,
  icon,
  selected,
  ...other
}: IBottomBarItemProps) => {
  const classes = cx("item", { "item-selected": selected });
  return (
    <button className={classes} onMouseDown={() => onChange(value)} {...other}>
      {icon}
      {label && <p>{label}</p>}
    </button>
  );
};

export default BottomBarItem;
