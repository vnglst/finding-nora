import * as qs from 'qs'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app'
import './index.css'
import preventDoubleTapZoom from './prevent-double-tap-zoom'
import { navigation } from './reducers'
import registerServiceWorker from './registerServiceWorker'
import { IStoreState } from './types'

const query = qs.parse(location.search.substr(1).toLowerCase())
const SOLUTION = (query.name || 'NORA').toUpperCase()
const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

preventDoubleTapZoom()

const store = createStore<IStoreState, any, any, any>(
  navigation,
  {
    currentScreen: 'home',
    noise: NOISE,
    size: 5,
    solution: SOLUTION,
  },
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
