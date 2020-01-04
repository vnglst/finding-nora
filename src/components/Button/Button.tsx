import cx from "classnames";
import React, { FunctionComponent } from "react";
import "./Button.css";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
}

const Button: FunctionComponent<IButtonProps> = ({
  children,
  className,
  ...other
}) => (
  <button className={cx("button", className)} {...other}>
    {children}
  </button>
);

export default Button;
