import { IGameState } from './reducers'
import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { loadSounds } from "../utils/audio-init";

const sounds = loadSounds();

/**
 * Middleware to handle side effects from redux actions, like
 * playing audio, saving state to localStorage, analytics, etc.
 * 
 */
export const middleware: Middleware = ({ getState }: MiddlewareAPI) => (
  next: Dispatch
) => (action: any) => {
  const result = next(action);
  const nextState = getState() as IGameState;

  switch (action.type) {
    case 'RESTART': {
      sounds.restart.play();
      return result;
    }
    case 'WRONG_ANSWER': {
      sounds.squakk.play();
      return result;
    }

    case 'CORRECT_ANSWER': {
      sounds.nock.play();
      return result;
    }

    case 'ALMOST_CORRECT_ANSWER': {
      sounds.euh.play();
      return result;
    }

    case "YOU_WON": {
      sounds.hooyeah.play();
      return result;
    }

    case 'UPDATE_SOLUTION': {
      localStorage.setItem("finding/name", nextState.solution)
      break;
    }

    default:
      return result;
  }
};
