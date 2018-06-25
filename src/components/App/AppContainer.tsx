import { connect, Dispatch } from 'react-redux'
import { didLoose, didWin, getRemainingSolution } from '../../model/game-model'
import * as gameActions from '../../redux/game-actions'
import * as navigationActions from '../../redux/navigation-actions'
import { IStoreState } from '../../types'
import App from './App'

const mapStateToProps = ({ game, navigation }: IStoreState) => {
  return {
    currentPage: navigation.currentPage,
    didLoose: didLoose(game.solution, game.grid),
    didWin: didWin(game.solution, game.grid),
    remainingSolution: getRemainingSolution(game.solution, game.grid),
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<
    navigationActions.NavigationActionType | gameActions.GameActionType
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
