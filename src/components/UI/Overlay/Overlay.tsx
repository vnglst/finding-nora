import * as React from 'react'
import './Overlay.css'

interface IOverlayProps {
  children: React.ReactNode
}

class Overlay extends React.Component<IOverlayProps, object> {
  public render() {
    return (
      <div className="overlay">
        <div className="overlay-content slide-in-top">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Overlay
