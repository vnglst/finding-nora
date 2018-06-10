import * as React from 'react'
import './Overlay.css'

class Overlay extends React.Component {
  render () {
    return (
      <div
        className='overlay'>
        <div className='overlay-container'>
          <div className='overlay-content'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Overlay
