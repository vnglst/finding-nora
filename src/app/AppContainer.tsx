import { connect, Dispatch } from 'react-redux'
import * as actions from '../actions/navigation'
import { IStoreState } from '../types'
import App from './App'

export function mapStateToProps({
  navigation: { currentScreen },
  game: { size, solution, noise },
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
