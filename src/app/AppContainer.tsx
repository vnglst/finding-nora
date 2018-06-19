import { connect, Dispatch } from 'react-redux'
import * as actions from '../redux/navigation'
import { IStoreState } from '../types'
import App from './App'

export function mapStateToProps({ navigation }: IStoreState) {
  return {
    navigation,
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
