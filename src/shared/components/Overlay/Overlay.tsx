import cx from 'classnames'
import * as React from 'react'
import './Overlay.css'

interface IOverlayProps {
  children: React.ReactNode
  className?: string
}

const Overlay = ({ className, children }: IOverlayProps) => (
  <div className="overlay">
    <div className={cx('overlay-content slide-in-top', className)}>
      {children}
    </div>
  </div>
)

export default Overlay
