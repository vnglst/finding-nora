import { produce } from "immer";
import { initialQuestions } from "./names";
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
  ADD_ANSWER,
  RESTART,
  NEW_GAME,
  ActionType,
  RESET
} from "./actions";

export const generateNewGame = (current = 0, questions = initialQuestions) => {
  const grid = generatePuzzle(5, questions[current]);
  return {
    current,
    questions,
    grid,
    solutions: findSolutions(grid, questions[current]),
    remaining: questions[current]
  };
};

export type AppState = ReturnType<typeof generateNewGame>;

export function reducers(state = generateNewGame(), action: ActionType) {
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
        const { current, questions } = draft;
        return generateNewGame(current, questions);
      }

      case NEW_GAME: {
        const { current, questions } = draft;
        const next = current < questions.length - 1 ? current + 1 : 0;
        return generateNewGame(next, questions);
      }

      case RESET: {
        return generateNewGame();
      }

      case ADD_ANSWER: {
        // insert new question at current index into questions array
        draft.questions.splice(draft.current, 0, action.payload);
        break;
      }

      default:
        return draft;
    }
  });
}
