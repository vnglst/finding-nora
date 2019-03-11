import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'
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

preventDoubleTapZoom({ delay: 500 })

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore<IStoreState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(audioMiddleware))
)

const bugsnagClient = bugsnag('eb9c66e47f7f95c5801a21ffe1308619')
bugsnagClient.use(bugsnagReact, React)
const ErrorBoundary = bugsnagClient.getPlugin('react')

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <FindingWords path="/" default={true} />
        <FindingColors path="/colors" />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
