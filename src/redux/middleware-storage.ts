import {
  RESTART,
  YOU_WON,
  ADD_ANSWER,
  RESET,
  NEW_GAME,
  ActionType
} from "./actions";
import { Middleware } from "redux";
import { localStore } from "../utils/storage";
import { AppState, generateNewGame } from "./reducers";
import { reportError } from "../utils/bugsnag";

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
    reportError(error as Error);
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
    reportError(error as Error);
    return generateNewGame();
  }
}

/**
 * Middleware to handle saving state to localStorage
 */
export const storageMiddleware: Middleware = ({ getState }) => (
  next
) => (action: unknown) => {
  if (!action || typeof action !== 'object' || !('type' in action)) {
    return next(action);
  }
  const typedAction = action as ActionType;
  const result = next(action);
  const nextState = getState();

  switch (typedAction.type) {
    // update stored state only on relevant redux actions
    case YOU_WON:
    case RESTART:
    case NEW_GAME:
    case RESET:
    case ADD_ANSWER: {
      storeState(nextState);
      return result;
    }

    default:
      return result;
  }
};
