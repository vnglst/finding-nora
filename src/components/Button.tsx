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
  testId?: string;
}

export default function Button({
  children,
  className,
  isSecondary,
  testId,
  ...other
}: Props) {
  return (
    <button
      className={cx("button", { secondary: isSecondary }, className)}
      data-testid={testId}
      {...other}
    >
      {children}
    </button>
  );
}
