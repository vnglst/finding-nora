import { didWin } from "../model/puzzle-utils";
import { IStoreState, StatusEnum } from "../types";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { loadSounds } from "./audio-init";
import { ADD_ANSWER, RESTART } from "./constants";
import { GameActionType } from "./game-actions";

const sounds = loadSounds();

/**
 * Middleware that plays sounds based on Redux actions
 */
export const audioMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (
  next: Dispatch
) => (action: GameActionType) => {
  const result = next(action);

  const nextState = getState() as IStoreState;

  switch (action.type) {
    case RESTART: {
      sounds.restart.play();
      return result;
    }
    case ADD_ANSWER: {
      if (action.item.status === StatusEnum.Wrong) {
        sounds.squakk.play();
      }
      if (action.item.status === StatusEnum.AlmostCorrect) {
        sounds.euh.play();
      }
      if (action.item.status === StatusEnum.Correct) {
        sounds.nock.play();
      }
      const hasWon = didWin(nextState.game.solution, nextState.game.grid);
      if (hasWon) {
        sounds.hooyeah.play();
      }

      return result;
    }
    default:
      return result;
  }
};
