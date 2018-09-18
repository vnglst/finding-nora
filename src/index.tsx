import { Router } from '@reach/router'
import FindingColors from 'finding-colors'
import FindingWords from 'finding-words'
import { audioMiddleware } from 'finding-words/redux/audio-middleware'
import { IStoreState } from 'finding-words/types'
import preventDoubleTapZoom from 'prevent-double-tap-zoom'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from 'shared/redux/root-reducer'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

preventDoubleTapZoom({ delay: 500 })

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore<IStoreState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(audioMiddleware))
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <FindingWords path="/" />
      <FindingColors path="/finding-colors" />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
