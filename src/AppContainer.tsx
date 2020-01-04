import { connect } from "react-redux";
import { Dispatch } from "redux";
import { didLoose, didWin, getRemainingSolution } from "./model/puzzle-utils";
import * as gameActions from "./redux/game-actions";
import { IStoreState } from "./types";
import * as navigationActions from "./redux/navigation-actions";
import App from "./App";

const mapStateToProps = ({ game, navigation }: IStoreState) => {
  return {
    currentPage: navigation.currentPage,
    didLoose: didLoose(game.solution, game.grid),
    didWin: didWin(game.solution, game.grid),
    remainingSolution: getRemainingSolution(game.solution, game.grid),
    solution: game.solution
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<
    navigationActions.NavigationActionType | gameActions.GameActionType
  >
) => {
  const updateSolution = (solution: string[]) => {
    localStorage.setItem("name", solution.join(""));
    dispatch(gameActions.updateSolution(solution));
  };

  return {
    onNavigate: (screen: string) =>
      dispatch(navigationActions.setActiveScreen(screen)),
    restart: () => dispatch(gameActions.restart()),
    updateSolution
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
