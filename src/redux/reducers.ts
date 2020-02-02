import { produce } from 'immer';
import { generatePuzzle, filterPossibleSolutions, findSolutions } from "../model/puzzle";
import { StatusEnum } from "types";

const getInitialState = (name?: string) => {
  const NAME = name || localStorage.getItem("finding/name") || "NORA";
  const SOLUTION = NAME.toUpperCase();
  const GRID = generatePuzzle(5, SOLUTION);
  const SOLUTIONS = findSolutions(GRID, SOLUTION);

  return {
    grid: GRID,
    solution: SOLUTION,
    solutions: SOLUTIONS,
    remaining: NAME
  }
}

const INITIAL_STATE = getInitialState();

export type IGameState = typeof INITIAL_STATE;

export function reducers(
  state = INITIAL_STATE,
  action: { type: string, payload: any }
): IGameState {
  return produce(state, draft => {
    switch (action.type) {
      case 'CORRECT_ANSWER': {
        const answer = action.payload;

        // update status of clicked grid item to correct
        draft.grid[answer.row][answer.column].status = StatusEnum.Correct;

        // keep only possible solutions
        draft.solutions = filterPossibleSolutions(draft.solutions, answer);

        // remove letter from remaining solutions
        draft.solutions.forEach((solution) => solution.shift())

        // remove letter from remaining solution
        draft.remaining = draft.remaining.substr(1);
        break;
      }

      case 'ALMOST_CORRECT_ANSWER': {
        const { row, column } = action.payload;
        draft.grid[row][column].status = StatusEnum.AlmostCorrect;
        break;
      }

      case 'WRONG_ANSWER': {
        const { row, column } = action.payload;
        draft.grid[row][column].status = StatusEnum.Wrong;
        break;
      }

      case 'RESTART': {
        return getInitialState(draft.solution);
      }

      case 'UPDATE_SOLUTION': {
        draft.solution = action.payload;
        break;
      }

      default:
        return draft;
    }
  })
}
