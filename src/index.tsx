import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import preventDoubleTapZoom from './prevent-double-tap-zoom'
import registerServiceWorker from './registerServiceWorker'

preventDoubleTapZoom()

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
