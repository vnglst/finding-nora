import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  didLoose,
  didWin,
  getRemainingSolution,
  isCorrectAnswer,
  isCorrectLetter
} from "./model/puzzle-utils";
import * as actions from "./redux/game-actions";
import { GridType, IGridItem, StatusEnum, IGameState } from "./types";
import App from "./App";

const getAnswerStatus = ({ answer, solution, grid }: IAddAnswer) => {
  const isCorrect = isCorrectAnswer({ answer, solution, grid });
  if (isCorrect) {
    return StatusEnum.Correct;
  }

  if (!isCorrect && isCorrectLetter({ answer, grid, solution })) {
    return StatusEnum.AlmostCorrect;
  }

  return StatusEnum.Wrong;
};

const mapStateToProps = (state: IGameState) => {
  return {
    didLoose: didLoose(state.solution, state.grid),
    didWin: didWin(state.solution, state.grid),
    remainingSolution: getRemainingSolution(state.solution, state.grid),
    solution: state.solution,
    game: state
  };
};

interface IAddAnswer {
  answer: IGridItem;
  grid: GridType;
  solution: string[];
}

const mapDispatchToProps = (dispatch: Dispatch<actions.GameActionType>) => {
  const updateSolution = (solution: string[]) => {
    localStorage.setItem("name", solution.join(""));
    dispatch(actions.updateSolution(solution));
  };

  const addAnswer = ({ answer, solution, grid }: IAddAnswer) => {
    const status = getAnswerStatus({ answer, solution, grid });
    const answerWithStatus = {
      ...answer,
      status
    };
    dispatch(actions.addAnswer(answerWithStatus));
  };

  return {
    restart: () => dispatch(actions.restart()),
    addAnswer,
    updateSolution
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
