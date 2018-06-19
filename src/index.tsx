import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app'
import './index.css'
import preventDoubleTapZoom from './prevent-double-tap-zoom'
import rootReducer from './redux/reducers'
import registerServiceWorker from './registerServiceWorker'
import { IStoreState } from './types'

preventDoubleTapZoom()

const store = createStore<IStoreState, any, any, any>(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
