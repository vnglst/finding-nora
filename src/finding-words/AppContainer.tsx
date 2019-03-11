import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  didLoose,
  didWin,
  getRemainingSolution
} from 'src/finding-words/model/puzzle-utils'
import * as gameActions from 'src/finding-words/redux/game-actions'
import { IStoreState } from 'src/finding-words/types'
import * as navigationActions from 'src/shared/redux/navigation-actions'
import App from './App'

const mapStateToProps = ({ game, navigation }: IStoreState) => {
  return {
    currentPage: navigation.currentPage,
    didLoose: didLoose(game.solution, game.grid),
    didWin: didWin(game.solution, game.grid),
    remainingSolution: getRemainingSolution(game.solution, game.grid),
    solution: game.solution
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<
    navigationActions.NavigationActionType | gameActions.GameActionType
  >
) => {
  const updateSolution = (solution: string[]) => {
    // save name to localstorage, TODO: use redux-persist for this
    localStorage.setItem('name', solution.join(''))
    dispatch(gameActions.updateSolution(solution))
  }

  return {
    onNavigate: (screen: string) =>
      dispatch(navigationActions.setActiveScreen(screen)),
    restart: () => dispatch(gameActions.restart()),
    updateSolution
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
