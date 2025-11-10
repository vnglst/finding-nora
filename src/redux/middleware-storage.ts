import { Middleware } from "redux";
import { localStore } from "../utils/storage";
import { AppState, generateNewGame } from "./gameSlice";
import {
  restart,
  youWon,
  addAnswer,
  reset,
  newGame
} from "./gameSlice";

const STORAGE_KEY = "finding-nora";

function storeState(state: AppState) {
  try {
    const stateStr = JSON.stringify({
      questions: state.questions,
      current: state.current
    });

    localStore.setItem(STORAGE_KEY, stateStr);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function loadState() {
  try {
    // generates new game based on stored state
    const stateStr = localStore.getItem(STORAGE_KEY);
    const storedState = stateStr ? (JSON.parse(stateStr) as AppState) : null;
    const current = storedState ? storedState.current : undefined;
    const questions = storedState ? storedState.questions : undefined;
    return generateNewGame(current, questions);
  } catch (error) {
    console.error(error);
    return generateNewGame();
  }
}

/**
 * Middleware to handle saving state to localStorage
 */
export const storageMiddleware: Middleware = ({ getState }) => (next) => (action) => {
  const result = next(action);

  // update stored state only on relevant redux actions
  if (
    youWon.match(action) ||
    restart.match(action) ||
    newGame.match(action) ||
    reset.match(action) ||
    addAnswer.match(action)
  ) {
    const nextState = getState();
    storeState(nextState);
  }

  return result;
};
