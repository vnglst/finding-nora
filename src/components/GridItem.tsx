import cx from "classnames";
import * as React from "react";
import Button from "./Button";
import "./GridItem.css";

export interface GridItemProps {
  onClick: () => void;
  children?: React.ReactNode;
  falldown?: boolean;
  slideouttop?: boolean;
  green?: boolean;
  red?: boolean;
  orange?: boolean;
  className?: string;
  style?: object;
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  green,
  orange,
  red,
  falldown,
  slideouttop,
  className,
  onClick,
  ...other
}) => {
  const classes = cx(
    "grid-item",
    { falldown },
    { slideouttop },
    { red },
    { green },
    { orange },
    { className }
  );

  function handleClick(
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) {
    e.preventDefault();
    onClick();
  }

  return (
    <Button
      onMouseDown={handleClick}
      onTouchStart={handleClick}
      className={classes}
      {...other}
    >
      {children}
    </Button>
  );
};

export default GridItem;
