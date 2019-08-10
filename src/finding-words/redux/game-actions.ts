import { IGridItem } from "../types";
import * as constants from "./constants";

export type GameActionType =
  | IAddAnswerAction
  | IRestartAction
  | IUpdateSolutionAction;

interface IRestartAction {
  type: constants.RESTART;
}

export const restart = (): IRestartAction => {
  return {
    type: constants.RESTART
  };
};

interface IUpdateSolutionAction {
  solution: string[];
  type: constants.UPDATE_SOLUTION;
}

export const updateSolution = (solution: string[]): IUpdateSolutionAction => {
  return {
    solution,
    type: constants.UPDATE_SOLUTION
  };
};

interface IAddAnswerAction {
  type: constants.ADD_ANSWER;
  item: IGridItem;
}

export const addAnswer = (answer: IGridItem): IAddAnswerAction => ({
  item: {
    ...answer,
    updatedAt: new Date()
  },
  type: constants.ADD_ANSWER
});
