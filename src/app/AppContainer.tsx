import { connect, Dispatch } from 'react-redux'
import { GameAction, restart } from '../redux/game-actions'
import * as actions from '../redux/navigation-actions'
import { IStoreState } from '../types'
import App from './App'

export function mapStateToProps({ navigation }: IStoreState) {
  return {
    navigation,
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch<actions.ISetActiveScreen | GameAction>,
) {
  return {
    onNavigate: (screen: string) => dispatch(actions.setActiveScreen(screen)),
    restart: () => dispatch(restart()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
