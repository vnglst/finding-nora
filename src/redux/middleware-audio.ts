import {
  RESTART,
  ADD_WRONG,
  ADD_CORRECT,
  ADD_ALMOST,
  YOU_WON,
  ActionType
} from "./actions";
import { Middleware } from "redux";
import { loadSounds } from "../utils/audio-init";

const sounds = loadSounds();

/**
 * Middleware to handle side effect of playing audio
 */
export const audioMiddleware: Middleware = () => (next) => (
  action: unknown
) => {
  if (!action || typeof action !== 'object' || !('type' in action)) {
    return next(action);
  }
  const typedAction = action as ActionType;
  const result = next(action);

  switch (typedAction.type) {
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

    default:
      return result;
  }
};
