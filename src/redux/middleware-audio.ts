import { Middleware } from "redux";
import { loadSounds } from "../utils/audio-init";
import {
  restart,
  addWrong,
  addCorrect,
  addAlmost,
  youWon
} from "./gameSlice";

const sounds = loadSounds();

/**
 * Middleware to handle side effect of playing audio
 */
export const audioMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (restart.match(action)) {
    sounds.restart.play();
  } else if (addWrong.match(action)) {
    sounds.squakk.play();
  } else if (addCorrect.match(action)) {
    sounds.nock.play();
  } else if (addAlmost.match(action)) {
    sounds.euh.play();
  } else if (youWon.match(action)) {
    sounds.hooyeah.play();
  }

  return result;
};
