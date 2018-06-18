import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/'
import { IStoreState } from '../types'
import App from './App'

export function mapStateToProps({
  currentScreen,
  noise,
  solution,
  size,
}: IStoreState) {
  return {
    currentScreen,
    noise,
    size,
    solution,
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch<actions.ISetActiveScreen>,
) {
  return {
    onNavigate: (screen: string) => dispatch(actions.setActiveScreen(screen)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
