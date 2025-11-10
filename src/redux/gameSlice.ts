import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialQuestions } from "./names";
import {
  generatePuzzle,
  filterPossibleSolutions,
  findSolutions
} from "../model/puzzle";
import { GridItem, Status } from "../types";

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

const gameSlice = createSlice({
  name: "game",
  initialState: generateNewGame(),
  reducers: {
    addAnswer: (state, action: PayloadAction<string>) => {
      // insert new question at current index into questions array
      state.questions.splice(state.current, 0, action.payload);
    },
    addCorrect: (state, action: PayloadAction<GridItem>) => {
      const answer = action.payload;

      // update status of clicked grid item to correct
      state.grid[answer.row][answer.column].status = Status.Correct;

      // keep only possible solutions
      state.solutions = filterPossibleSolutions(state.solutions, answer);

      // remove letter from remaining solutions
      state.solutions.forEach(solution => solution.shift());

      // remove letter from remaining solution
      state.remaining = state.remaining.substr(1);
    },
    addWrong: (state, action: PayloadAction<GridItem>) => {
      const { row, column } = action.payload;
      state.grid[row][column].status = Status.Wrong;
    },
    addAlmost: (state, action: PayloadAction<GridItem>) => {
      const { row, column } = action.payload;
      state.grid[row][column].status = Status.AlmostCorrect;
    },
    restart: (state) => {
      return generateNewGame(state.current, state.questions);
    },
    newGame: (state) => {
      const next = state.current < state.questions.length - 1 ? state.current + 1 : 0;
      return generateNewGame(next, state.questions);
    },
    reset: () => {
      return generateNewGame();
    },
    youWon: () => {
      // No state change, just triggers middleware
    }
  }
});

export const {
  addAnswer,
  addCorrect,
  addWrong,
  addAlmost,
  restart,
  newGame,
  reset,
  youWon
} = gameSlice.actions;

export default gameSlice.reducer;
