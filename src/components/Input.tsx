import cx from "classnames";
import * as React from "react";
import "./Input.css";

interface Props extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  valid?: boolean;
}

export default function Input({ className, valid, ...other }: Props) {
  const classes = cx("my-input", { valid }, { invalid: !valid }, className);
  return <input className={classes} {...other} />;
}
