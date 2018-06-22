import { connect, Dispatch } from 'react-redux'
import * as gameActions from '../../redux/game-actions'
import { didWin } from '../../redux/game-model'
import * as navigationActions from '../../redux/navigation-actions'
import { IStoreState } from '../../types'
import App from './App'

const mapStateToProps = ({ game, navigation }: IStoreState) => {
  return {
    didWin: didWin(game.solution, game.grid),
    navigation,
    solution: game.solution,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<
    navigationActions.ISetActiveScreen | gameActions.GameActionType
  >,
) => {
  const updateSolution = (solution: string[]) => {
    // safe name to localstorage, TODO: use redux-persist for this
    localStorage.setItem('name', solution.join(''))
    dispatch(gameActions.updateSolution(solution))
  }

  return {
    onNavigate: (screen: string) =>
      dispatch(navigationActions.setActiveScreen(screen)),
    restart: () => dispatch(gameActions.restart()),
    updateSolution,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
