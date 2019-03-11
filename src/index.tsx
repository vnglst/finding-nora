import { Router } from '@reach/router'
import preventDoubleTapZoom from 'prevent-double-tap-zoom'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import FindingColors from 'src/finding-colors'
import FindingWords from 'src/finding-words'
import { audioMiddleware } from 'src/finding-words/redux/audio-middleware'
import { IStoreState } from 'src/finding-words/types'
import rootReducer from 'src/shared/redux/root-reducer'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { initializeAnalytics } from './shared/utils/analytics'
import { BugsnagErrorBoundary } from './shared/utils/bugsnag'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore<IStoreState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(audioMiddleware))
)

ReactDOM.render(
  <BugsnagErrorBoundary>
    <Provider store={store}>
      <Router>
        <FindingWords path="/" default={true} />
        <FindingColors path="/colors" />
      </Router>
    </Provider>
  </BugsnagErrorBoundary>,
  document.getElementById('root') as HTMLElement
)

preventDoubleTapZoom({ delay: 500 })
registerServiceWorker()
initializeAnalytics()
