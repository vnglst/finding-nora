import { AppState, STORAGE_KEY } from './reducers'
import { RESTART, ADD_WRONG, ADD_CORRECT, ADD_ALMOST, YOU_WON, ActionType, ADD_SOLUTION } from './actions';
import { Middleware } from "redux";
import { AppDispatch } from '../';
import { loadSounds } from "../utils/audio-init";

const sounds = loadSounds();

/**
 * Middleware to handle side effects from redux actions, like
 * playing audio, saving state to localStorage, analytics, etc.
 */
export const middleware: Middleware = ({ getState }) => (
  next: AppDispatch
) => (action: ActionType) => {
  const result = next(action);
  const nextState = getState() as AppState;

  switch (action.type) {
    case RESTART: {
      sounds.restart.play();
      return result;
    }
    case ADD_WRONG: {
      sounds.squakk.play();
      return result;
    }

    case ADD_CORRECT: {
      sounds.nock.play();
      return result;
    }

    case ADD_ALMOST: {
      sounds.euh.play();
      return result;
    }

    case YOU_WON: {
      sounds.hooyeah.play();
      return result;
    }

    case ADD_SOLUTION: {
      localStorage.setItem(STORAGE_KEY, nextState.solution)
      break;
    }

    default:
      return result;
  }
};
