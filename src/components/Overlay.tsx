import cx from "classnames";
import * as React from "react";
import "./Overlay.css";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Overlay({ className, children }: Props) {
  return (
    <div className="overlay">
      <div className={cx("overlay-content slide-in-top", className)}>
        {children}
      </div>
    </div>
  );
}
