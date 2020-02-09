import {
  RESTART,
  YOU_WON,
  ADD_ANSWER,
  RESET,
  NEW_GAME,
  ActionType
} from "./actions";
import { Middleware } from "redux";
import { AppDispatch } from "..";
import { localStore } from "../utils/storage";
import { AppState } from "./reducers";
import { reportError } from "utils/bugsnag";

const STORAGE_KEY = "finding-nora";

function storeState(state: AppState) {
  try {
    const stateStr = JSON.stringify({
      solutions: state.solutions,
      current: state.current
    });

    localStore.setItem(STORAGE_KEY, stateStr);
  } catch (error) {
    reportError(error);
    return null;
  }
}

export function loadState() {
  try {
    const stateStr = localStore.getItem(STORAGE_KEY);
    const state = stateStr ? (JSON.parse(stateStr) as AppState) : null;
    return state;
  } catch (error) {
    reportError(error);
    return null;
  }
}

/**
 * Middleware to handle saving state to localStorage
 */
export const storageMiddleware: Middleware = ({ getState }) => (
  next: AppDispatch
) => (action: ActionType) => {
  const result = next(action);
  const nextState = getState();

  switch (action.type) {
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
