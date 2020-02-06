import { produce } from "immer";
import { localStore } from "../utils/better-storage";
import {
  generatePuzzle,
  filterPossibleSolutions,
  findSolutions
} from "../model/puzzle";
import { Status } from "types";
import {
  ADD_CORRECT,
  ADD_ALMOST,
  ADD_WRONG,
  ADD_SOLUTION,
  RESTART,
  ActionType
} from "./actions";

export const STORAGE_KEY = "finding-nora";

const getInitialState = (name?: string) => {
  const NAME = name || localStore.getItem(STORAGE_KEY) || "NORA";
  const SOLUTION = NAME.toUpperCase();
  const GRID = generatePuzzle(5, SOLUTION);
  const SOLUTIONS = findSolutions(GRID, SOLUTION);

  return {
    grid: GRID,
    solution: SOLUTION,
    solutions: SOLUTIONS,
    remaining: NAME
  };
};

const INITIAL_STATE = getInitialState();

export function reducers(state = INITIAL_STATE, action: ActionType) {
  // using immer to allow direct mutation of state
  return produce(state, draft => {
    switch (action.type) {
      case ADD_CORRECT: {
        const answer = action.payload;

        // update status of clicked grid item to correct
        draft.grid[answer.row][answer.column].status = Status.Correct;

        // keep only possible solutions
        draft.solutions = filterPossibleSolutions(draft.solutions, answer);

        // remove letter from remaining solutions
        draft.solutions.forEach(solution => solution.shift());

        // remove letter from remaining solution
        draft.remaining = draft.remaining.substr(1);
        break;
      }

      case ADD_ALMOST: {
        const { row, column } = action.payload;
        draft.grid[row][column].status = Status.AlmostCorrect;
        break;
      }

      case ADD_WRONG: {
        const { row, column } = action.payload;
        draft.grid[row][column].status = Status.Wrong;
        break;
      }

      case RESTART: {
        return getInitialState(draft.solution);
      }

      case ADD_SOLUTION: {
        draft.solution = action.payload;
        break;
      }

      default:
        return draft;
    }
  });
}

export type AppState = ReturnType<typeof reducers>;
