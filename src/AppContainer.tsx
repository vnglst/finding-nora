import { connect } from "react-redux";
import { Dispatch } from "redux";
import { didLoose, didWin, getRemainingSolution } from "./model/puzzle-utils";
import * as gameActions from "./redux/game-actions";
import { IGameState } from "./types";
import App from "./App";

const mapStateToProps = (state: IGameState) => {
  return {
    didLoose: didLoose(state.solution, state.grid),
    didWin: didWin(state.solution, state.grid),
    remainingSolution: getRemainingSolution(state.solution, state.grid),
    solution: state.solution
  };
};

const mapDispatchToProps = (dispatch: Dispatch<gameActions.GameActionType>) => {
  const updateSolution = (solution: string[]) => {
    localStorage.setItem("name", solution.join(""));
    dispatch(gameActions.updateSolution(solution));
  };

  return {
    restart: () => dispatch(gameActions.restart()),
    updateSolution
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
