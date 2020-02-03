import cx from "classnames";
import React from "react";
import "./Button.css";

interface Props {
  isSecondary?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
}

const Button = ({ children, className, isSecondary, ...other }: Props) => (
  <button
    className={cx("button", { secondary: isSecondary }, className)}
    {...other}
  >
    {children}
  </button>
);

export default Button;
