import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './app'
import './index.css'
import preventDoubleTapZoom from './prevent-double-tap-zoom'
import { audioMiddleware } from './redux/audio-middleware'
import rootReducer from './redux/reducers'
import registerServiceWorker from './registerServiceWorker'
import { IStoreState } from './types'

preventDoubleTapZoom()

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore<IStoreState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(audioMiddleware, thunk)),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
